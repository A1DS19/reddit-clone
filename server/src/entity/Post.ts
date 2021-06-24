import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Updoot } from './Updoot';
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

  @Field(() => Int, { nullable: true })
  voteStatus: number | null; //puede ser 1, -1 o null

  @OneToMany(() => Updoot, (updoot) => updoot.post)
  updoots: Updoot[];

  @Field(() => [String])
  @Column('text', { array: true, default: [] })
  files: Array<string>;

  //usualmente incluido para mapear mas facilmente...
  //igual al JoinColumn({name:'user_id'})
  @Column('int')
  creator_id: number;

  //Many Post -> One User
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user: User) => user.posts)
  //specify custom column name or custom referenced column.
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
