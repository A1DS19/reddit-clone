import jwt from 'jsonwebtoken';
import { User } from 'src/entity/User';

export const createTokens = (
  user: User
): { refreshToken: string; accessToken: string } => {
  try {
    const refreshToken = jwt.sign(
      { userId: user.id, count: user.count },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15min',
      }
    );

    return { refreshToken, accessToken };
  } catch (error) {
    throw new Error('CREATE TOKENS');
  }
};
