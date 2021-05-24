import { AuthenticationError } from 'apollo-server-express';
import { MyContext } from 'src/types/MyContext';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    const { req } = context;
    if (!(req as any).userId) {
      throw new AuthenticationError('No autenticado');
    }

    return next();
  } catch (err) {
    throw new Error(err.message);
  }
};
