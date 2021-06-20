import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity({ name: 'post' })
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column('text')
  title: string;

  @Field(() => String)
  @Column('text')
  body: string;

  @Field(() => Int)
  @Column('int', { default: 0 })
  votes: number;

  @Field(() => [String])
  @Column('text', { array: true, default: [] })
  files: Array<string>;

  //usualmente incluido para mapear mas facilmente...
  //igual al JoinColumn({name:'user_id'})
  @Column('int')
  user_id: number;

  //Many Post -> One User
  @ManyToOne(() => User, (user: User) => user.posts)
  //specify custom column name or custom referenced column.
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
