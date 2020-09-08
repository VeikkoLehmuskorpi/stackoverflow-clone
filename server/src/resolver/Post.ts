import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import { Post } from '../entity/Post';
import { MyContext } from '../types';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { orm }: MyContext): Promise<Post[]> {
    return orm.manager.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg('uid', () => String) uid: string,
    @Ctx()
    { orm }: MyContext
  ): Promise<Post | undefined> {
    return orm.manager.findOne(Post, { uid });
  }
}
