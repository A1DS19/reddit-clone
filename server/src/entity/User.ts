import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column('text', { unique: true })
  username: string;

  @Field(() => String)
  @Column('text', { unique: true })
  email: string;

  @Field(() => String)
  @Column()
  password: string;
}
