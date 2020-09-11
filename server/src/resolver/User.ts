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

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg('options') options: UserRegistrationInput,
    @Ctx()
    { orm }: MyContext
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
      throw new ApolloError('Something went wrong.');
    }

    return orm.manager.save(newUser);
  }
}
