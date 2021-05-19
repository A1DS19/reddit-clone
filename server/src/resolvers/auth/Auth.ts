import { User } from '../../entity/User';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import * as argon2 from 'argon2';
import { LoginInput, RegisterInput } from './types';
import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { MyContext } from 'src/types/MyContext';
import { createTokens } from '../../util/token';

@Resolver(User)
export class Auth {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User> {
    try {
      const userId = (req as any).userId;

      if (!userId) {
        throw new AuthenticationError('Debe iniciar sesión');
      }

      const user = await User.findOne({ id: userId });

      if (!user) {
        throw new AuthenticationError('Usuario no existe');
      }

      return user;
    } catch (err) {
      throw new AuthenticationError(err.message);
    }
  }

  @Mutation(() => User)
  async register(
    @Arg('input') input: RegisterInput,
    @Ctx() ctx: MyContext
  ): Promise<User> {
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

      const user = await User.create({
        email: input.email,
        username: input.username,
        password: hashedPassword,
      }).save();

      const { refreshToken, accessToken } = createTokens(user);

      ctx.res.cookie('refresh-token', refreshToken);
      ctx.res.cookie('access-token', accessToken);

      return user;
    } catch (error) {
      throw new ValidationError(error.message);
    }
  }

  @Mutation(() => User)
  async login(@Arg('input') input: LoginInput, @Ctx() ctx: MyContext): Promise<User> {
    try {
      const user = await User.findOne({ email: input.email });

      if (!user) {
        throw new ValidationError('Datos invalidos');
      }

      const isPassword = await argon2.verify(user.password, input.password);

      if (!isPassword) {
        throw new ValidationError('Datos invalidos');
      }

      const { refreshToken, accessToken } = createTokens(user);

      ctx.res.cookie('refresh-token', refreshToken);
      ctx.res.cookie('access-token', accessToken);

      return user;
    } catch (error) {
      throw new ValidationError(error.message);
    }
  }

  @Mutation(() => Boolean)
  async invalidateTokens(@Ctx() { req }: MyContext): Promise<boolean> {
    const userId = (req as any).userId;
    if (!userId) {
      return false;
    }

    const user = await User.findOne({ id: userId });

    if (!user) {
      return false;
    }

    user.count += 1;

    await user.save();

    return true;
  }
}
