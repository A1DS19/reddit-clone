import { User } from './entity/User';
import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection, getManager } from 'typeorm';
import { Auth } from './resolvers/auth/Auth';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { GraphQLError } from 'graphql';
import { manageTokens } from './middleware/manageTokens';

(async () => {
  await createConnection();
  const entityManager = getManager();

  const app = express();
  const PORT = process.env.PORT || 4000;
  const env = process.env.NODE_ENV || 'development';

  app.use(cookieParser());

  app.use(
    cors({
      origin: env === 'development' ? 'http://localhost:3000' : '',
    })
  );

  app.use(async (req, res, next) => await manageTokens(req, res, next));

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Auth],
    }),
    formatError: (error: GraphQLError) => error,
    context: ({ req, res }) => ({ req, res, entityManager: entityManager }),
  });

  server.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(`SERVER STARTED\nPORT:${PORT}`);
  });
})().catch((err) => {
  console.error(`SERVER ERROR:\n${err}`);
});
