import {
  CreatePostInput,
  FetchPostInput,
  FetchPostsResponse,
  UpdatePostInput,
  UrlFileInput,
} from './types';
import { MyContext } from 'src/types/MyContext';
import { isAuth } from './../../middleware/isAuth';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware, Int } from 'type-graphql';
import { Post as PostEntity } from './../../entity/Post';
import { getManager, LessThanOrEqual, getConnection, LessThan } from 'typeorm';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { upload_post_file } from '../../services/cloudinary';

//Crear fieldResolver para body
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
  async fetchPosts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursorID: string | null
  ): Promise<FetchPostsResponse> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;
    const entityManager = getManager();
    let [posts, totalCount]: any = [];

    if (cursorID) {
      [posts, totalCount] = await entityManager.findAndCount(PostEntity, {
        where: { createdAt: LessThan(new Date(cursorID as string)) },
        order: { createdAt: 'DESC' },
        take: realLimitPlusOne,
      });
    } else {
      [posts, totalCount] = await entityManager.findAndCount(PostEntity, {
        order: { createdAt: 'DESC' },
        take: realLimitPlusOne,
      });
    }

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
      totalCount,
    };
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

//Offset pagination
// const real_limit = Number(limit) || 10;
// const real_offset = Number(offset) || 1;

// const [result, totalCount] = await PostEntity.findAndCount({
//   take: real_limit,
//   skip: (real_offset - 1) * real_limit,
//   order: { createdAt: -1 },
// });
