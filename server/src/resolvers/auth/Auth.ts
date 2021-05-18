import { User } from '../../entity/User';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import * as argon2 from 'argon2';
import { LoginInput, RegisterInput } from './types';
import { ValidationError } from 'apollo-server-express';

@Resolver(User)
export class Auth {
  @Query(() => String)
  test() {
    return 'loca';
  }

  @Mutation(() => User)
  async register(@Arg('input') input: RegisterInput): Promise<User> {
    try {
      const email = await User.findOne({ email: input.email });

      if (email) {
        throw new ValidationError(`El email ${email.email} ya existe`);
      }

      const username = await User.findOne({ username: input.username });

      if (username) {
        throw new ValidationError(`El usuario ${username.username} ya existe`);
      }

      const hashedPassword = await argon2.hash(input.password);

      return await User.create({
        email: input.email,
        username: input.username,
        password: hashedPassword,
      }).save();
    } catch (error) {
      throw new ValidationError(error.message);
    }
  }

  @Mutation(() => User)
  async login(@Arg('input') input: LoginInput): Promise<User> {
    try {
      const user = await User.findOne({ email: input.email });

      if (!user) {
        throw new ValidationError('Datos invalidos');
      }

      const isPassword = await argon2.verify(user.password, input.password);

      if (!isPassword) {
        throw new ValidationError('Datos invalidos');
      }

      return user;
    } catch (error) {
      throw new ValidationError(error.message);
    }
  }
}
