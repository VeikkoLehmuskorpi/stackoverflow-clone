import { Resolver, Mutation, Ctx, Arg, Field, InputType } from 'type-graphql';
import { User } from '../entity/User';
import { MyContext } from '../types';
import { validateInputs } from '../utils';
import { UserInputError, ApolloError } from 'apollo-server-express';
import argon2 from 'argon2';

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

    // TODO: Add validation for cases where the user is trying to register with
    // an email/username that's already in use
    return orm.manager.save(newUser);
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
      req.session!.userId = user.uid;

      return user;
    }
  }
}
