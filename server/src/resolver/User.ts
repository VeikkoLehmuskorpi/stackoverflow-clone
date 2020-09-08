import { Resolver, Query } from 'type-graphql';

@Resolver(UserResolver)
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hello!';
  }
}
