import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { UserInputError } from 'apollo-server-express';
import { Post } from '../entity/Post';
import { MyContext } from '../types';
import { validateInputs } from '../utils';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { orm }: MyContext): Promise<Post[]> {
    return orm.manager.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  async post(
    @Arg('id', () => String) id: string,
    @Ctx()
    { orm }: MyContext
  ): Promise<Post> {
    const post = await orm.manager.findOne(Post, { id });

    if (!post) {
      throw new Error(`Post with the id: ${id} does not exist!`);
    }

    return post;
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('title', () => String) title: string,
    @Arg('content', () => String) content: string,
    @Ctx() { orm }: MyContext
  ): Promise<Post> {
    const newPost = orm.manager.create(Post, { title, content });

    const errors = await validateInputs(newPost);

    if (errors.length) {
      throw new UserInputError('Validation error!', { errors });
    } else {
      return orm.manager.save(newPost);
    }
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg('id', () => String) id: string,
    @Arg('title', () => String) title: string,
    @Arg('content', () => String) content: string,
    @Ctx() { orm }: MyContext
  ): Promise<Post> {
    const post = await orm.manager.findOne(Post, { id });

    if (!post) {
      throw new Error(`Post with the id: ${id} does not exist!`);
    }

    Object.assign(post, { title, content });

    const errors = await validateInputs(post);

    if (errors.length) {
      throw new UserInputError('Validation error!', { errors });
    } else {
      return orm.manager.save(post);
    }
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id', () => String) id: string,
    @Ctx() { orm }: MyContext
  ): Promise<Boolean> {
    const post = await orm.manager.findOne(Post, { id });

    if (!post) {
      throw new Error(`Post with the id: ${id} does not exist!`);
    }

    try {
      await orm.manager.delete(Post, { id });

      return true;
    } catch (err) {
      return false;
    }
  }
}
