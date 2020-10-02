import {
  Resolver,
  Mutation,
  Ctx,
  Arg,
  Field,
  InputType,
  Query,
} from 'type-graphql';
import { User } from '~/entity/User';
import { MyContext } from '~/types';
import { validateInputs } from '~/utils/validateInputs';
import { generateUniqConstrErr } from '~/utils/generateUniqConstrErr';
import { UserInputError, ApolloError } from 'apollo-server-express';
import argon2 from 'argon2';
import { sendEmail } from '~/utils/sendEmail';
import {
  FORGOT_PASSWORD_PREFIX,
  PASSWORD_RESET_CHANGE_BASE_URL,
  PASSWORD_RESET_SUBJECT,
  USER_PREFIX,
} from '~/constants';
import { createPasswordResetHtml } from '~/utils/createPasswordResetHtml';
import { formClientUrl } from '~/utils/formClientUrl';
import { generateToken } from '~/utils/generateToken';

@InputType()
class UserRegistrationInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
class UserLoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
class UserResetPasswordInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  token: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg('options') options: UserRegistrationInput,
    @Ctx() { orm }: MyContext
  ): Promise<User> {
    const { email, username, password } = options;

    const newUser = orm.manager.create(User, { email, username });

    // Create a temporary user instance with the given plaintext password so
    // that the entire model can be validated. The plaintext password should not
    // be actually stored anywhere
    const newUserForValidation = new User();
    newUserForValidation.email = email;
    newUserForValidation.username = username;
    newUserForValidation.password = password;

    const errors = await validateInputs(newUserForValidation);

    if (errors.length) {
      throw new UserInputError('Validation error!', { errors });
    }

    // Hash the given plaintext password and store the hash in the database
    try {
      const hashedPassword = await argon2.hash(password);
      Object.assign(newUser, { password: hashedPassword });
    } catch (err) {
      throw new ApolloError('Something went wrong');
    }

    const userRepo = orm.getRepository(User);
    const createdUser = userRepo.create({ ...newUser });

    try {
      return await userRepo.save(createdUser);
    } catch (err) {
      if (err.code === '23505') {
        throw new UserInputError('Validation error!', {
          errors: generateUniqConstrErr(err.detail),
        });
      }

      throw new ApolloError('Something went wrong');
    }
  }

  @Mutation(() => User)
  async login(
    @Arg('options') options: UserLoginInput,
    @Ctx() { orm, req }: MyContext
  ): Promise<User> {
    const { email, password: plaintextPassword } = options;

    const user = await orm.manager.findOne(User, { email });

    if (!user) {
      throw new UserInputError(
        'No user with the provided email address was found'
      );
    }

    const isValidPassword = await argon2.verify(
      user.password,
      plaintextPassword
    );

    if (!isValidPassword) {
      throw new UserInputError('Invalid credentials');
    } else {
      // Store user in the session
      req.session!.userId = user.id;

      return user;
    }
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { orm, req }: MyContext): Promise<User | undefined> {
    const user = await orm.manager.findOne(User, {
      id: req.session?.userId,
    });

    return user;
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise(resolve =>
      req.session?.destroy(err => {
        if (err) {
          console.error(err);
          resolve(false);
          return;
        }

        // Clear the session cookie only if the session was successfully
        // destroyed
        res.clearCookie(`${process.env.SESSION_NAME}`);
        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { orm, redis }: MyContext
  ): Promise<Boolean> {
    const user = await orm.manager.findOne(User, { email });

    // No user with the given email address was found, but the fact shouldn't
    // be exposed to the user. Return a successful state as if the password
    // reset email was really sent
    if (!user || !user.email) return true;

    // Generate a random, secure token, then store it in Redis
    const token = generateToken();
    try {
      await redis.set(
        `${USER_PREFIX}:${FORGOT_PASSWORD_PREFIX}:${token}`,
        user.id,
        'ex',
        1000 * 60 * 60 * 24 * 2
      );
    } catch (err) {
      throw new ApolloError('Something went wrong');
    }

    const resetUrl = new URL(
      `${PASSWORD_RESET_CHANGE_BASE_URL}?token=${token}`,
      formClientUrl()
    );

    try {
      await sendEmail({
        to: user.email,
        subject: `${PASSWORD_RESET_SUBJECT}`,
        html: createPasswordResetHtml({ email: user.email, resetUrl }),
      });

      return true;
    } catch (err) {
      throw new ApolloError('Something went wrong');
    }
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg('options') options: UserResetPasswordInput,
    @Ctx() { orm, redis }: MyContext
  ): Promise<Boolean> {
    const { email, password, token } = options;

    const user = await orm.manager.findOne(User, { email });

    // No user with the given email address was found, but the fact shouldn't
    // be exposed to the user. Prompt the user to
    // request a new password reset
    if (!user) throw new ApolloError('Password reset token has expired');

    const redisUserId = await redis.get(
      `${USER_PREFIX}:${FORGOT_PASSWORD_PREFIX}:${token}`
    );

    // User tried to reset password with the wrong email address. Prompt the
    // user to request a new password reset
    if (user.id !== redisUserId) {
      throw new ApolloError('Password reset token has expired');
    }

    // Token from the client didn't match any stored tokens. The received token
    // could be expired or have come from a malicious actor. Prompt the user to
    // request a new password reset
    if (!redisUserId) throw new ApolloError('Password reset token has expired');

    // Token from the client matched the token stored for the user in
    // Redis, allow setting new password and remove the current token
    await redis.del(`${USER_PREFIX}:${FORGOT_PASSWORD_PREFIX}:${token}`);

    // Hash the given plaintext password and store the hash in the database
    try {
      const hashedPassword = await argon2.hash(password);
      await orm.manager.update(
        User,
        { id: user.id },
        { password: hashedPassword }
      );
    } catch (err) {
      throw new ApolloError('Something went wrong');
    }

    return true;
  }
}
