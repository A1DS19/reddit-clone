import { ArrayMaxSize, Length } from 'class-validator';
import { Post } from '../../entity/Post';
import { Field, InputType, Int, ObjectType } from 'type-graphql';

@InputType()
export class UrlFileInput {
  @Field(() => [String])
  @ArrayMaxSize(2, { message: "Solo puede agregar 3 URL'S" })
  files?: [string];
}

@InputType()
export class CreatePostInput {
  @Field(() => String)
  @Length(5, 255, { message: 'El titulo debe tener entre 5 y 255 caracteres' })
  title: string;

  @Field(() => String)
  @Length(5, 5000, { message: 'El contenido debe tener entre 5 y 5000 caracteres' })
  body: string;
}

@InputType()
export class FetchPostInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class FetchPostsInput {
  @Field(() => String)
  limit: number;

  @Field(() => String)
  page: number;
}

@ObjectType()
export class FetchPostsResponse {
  @Field(() => [Post])
  posts: Array<Post>;

  @Field(() => Int)
  totalCount: number;
}

@InputType()
export class UpdatePostInput {
  @Field(() => String)
  @Length(5, 255, { message: 'El titulo debe tener entre 5 y 255 caracteres' })
  title?: string;

  @Field(() => String)
  @Length(5, 5000, { message: 'El cuerpo debe tener entre 5 y 5000 caracteres' })
  body?: string;
}
