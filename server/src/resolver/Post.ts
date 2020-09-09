import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
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

  @Mutation(() => Post)
  createPost(
    @Arg('title', () => String) title: string,
    @Arg('content', () => String) content: string,
    @Ctx() { orm }: MyContext
  ): Promise<Post> {
    const newPost = orm.manager.create(Post, { title, content });

    return orm.manager.save(newPost);
  }
}
