import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './Post';
import { Updoot } from './Updoot';

@ObjectType()
@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column('text', { unique: true })
  username: string;

  @Field(() => String)
  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('int', { default: 0 })
  count: number;

  @Column('text', { default: null, nullable: true })
  resetToken: string;

  @Column('date', { default: null, nullable: true })
  resetTokenExpiry: Date;

  //One user -> Many posts
  @OneToMany('post', (post: Post) => post.creator, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  posts: Array<Post>;

  @OneToMany(() => Updoot, (updoot) => updoot.user)
  updoots: Updoot[];

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
