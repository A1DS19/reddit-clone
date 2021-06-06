import {
  CreatePostInput,
  FetchPostInput,
  FetchPostsInput,
  FetchPostsResponse,
  UpdatePostInput,
  UrlFileInput,
} from './types';
import { MyContext } from 'src/types/MyContext';
import { isAuth } from './../../middleware/isAuth';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Post as PostEntity } from './../../entity/Post';
import { getConnection } from 'typeorm';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { upload_post_file } from '../../services/cloudinary';

@Resolver(PostEntity)
export class Post {
  @Query(() => PostEntity, { nullable: true })
  async fetchPost(@Arg('input') { id }: FetchPostInput): Promise<PostEntity> {
    const post = await PostEntity.findOne({ id: Number(id) });

    if (!post) {
      throw new Error('El post no existe');
    }

    return post;
  }

  @Query(() => FetchPostsResponse, { nullable: true })
  async fetchPosts(@Arg('input') input: FetchPostsInput): Promise<FetchPostsResponse> {
    const limit = Number(input.limit) || 10;
    const page = Number(input.page) || 1;

    const [result, totalCount] = await PostEntity.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: -1 },
    });

    return { posts: result, totalCount: totalCount };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async uploadPostFile(
    @Arg('file', () => GraphQLUpload, { nullable: true })
    file: FileUpload,
    @Arg('postId') postId: string,
    @Arg('fileUrls', { nullable: true }) fileUrls: UrlFileInput,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const userId = (req as any).userId;
    const post_id = Number(postId);

    const post = await PostEntity.findOne({ id: post_id, user_id: userId });

    if (!post) {
      throw new Error('Post no existe');
    }

    if (post.files.length > 2) {
      throw new Error('No se puede agregar mas archivos');
    }

    if (file && file.filename) {
      const { filename, createReadStream } = file;
      const url = await upload_post_file(createReadStream, filename, userId, postId);
      post.files.push(url as string);
    }

    if (fileUrls.files) {
      for (let i = 0; i < fileUrls.files.length; i++) {
        post.files.push(fileUrls.files[i]);
      }
    }

    await post.save();

    return true;
  }

  @Mutation(() => PostEntity)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('input') input: CreatePostInput,
    @Ctx() { req }: MyContext
  ): Promise<PostEntity> {
    const userId = (req as any).userId;

    const post = await PostEntity.create({
      user_id: userId,
      title: input.title,
      body: input.body,
    }).save();

    return post;
  }

  @Mutation(() => PostEntity)
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg('postId') postId: string,
    @Arg('input') input: UpdatePostInput,
    @Ctx() { req }: MyContext
  ): Promise<PostEntity> {
    const id = Number(postId);
    const user_id = (req as any).userId;

    const post = await getConnection()
      .createQueryBuilder()
      .update<PostEntity>(PostEntity, input)
      .where('id = :id and user_id = :user_id', {
        id,
        user_id,
      })
      .returning('*')
      .updateEntity(true)
      .execute()
      .then((res) => res.raw[0]);

    if (!post) {
      throw new Error('Post no se pudo actualizar');
    }

    return post;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg('postId') postId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const id = Number(postId);
    const user_id = (req as any).userId;

    const post = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(PostEntity)
      .where('id = :id and user_id = :user_id', { id, user_id })
      .execute();

    if (post.affected === 0) {
      throw new Error('Post no fue eliminado o no existe');
    }

    return !!post;
  }
}
