import { Resolver, Query, Ctx } from 'type-graphql';
import { Post } from '../entity/Post';
import { MyContext } from '../types';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { orm }: MyContext): Promise<Post[]> {
    return orm.manager.find(Post, {});
  }
}
