import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../entity/User';
import { createTokens } from '../util/token';

export const manageTokens = async (req: any, res: Response, next: NextFunction) => {
  const accessToken: string = req.cookies['access-token'];
  const refreshToken: string = req.cookies['refresh-token'];

  if (!accessToken && !refreshToken) {
    return next();
  }

  try {
    const data = verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET) as any;
    req.userId = data.userId;
    return next();
  } catch {}

  if (!refreshToken) {
    return next();
  }

  let data;
  try {
    data = verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET) as any;
  } catch {
    return next();
  }

  const user = await User.findOne({ id: data.userId });

  if (!user) {
    return next();
  }

  if (user.count !== data.count) {
    console.log(`COUNT TOKEN: ${data.count}`, `USER COUNT DB: ${user.count}`);
    return next();
  }

  const tokens = createTokens(user);
  res.cookie('refresh-token', tokens.refreshToken);
  res.cookie('access-token', tokens.accessToken);
  req.userId = user.id;

  next();
};
