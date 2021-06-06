import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Auth } from './resolvers/auth/Auth';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { GraphQLError } from 'graphql';
import { manageTokens } from './middleware/manageTokens';
import { Post } from './resolvers/posts/Post';
import { graphqlUploadExpress } from 'graphql-upload';

(async () => {
  await createConnection();

  const app = express();
  const PORT = process.env.PORT || 4000;
  const env = process.env.NODE_ENV || 'development';

  app.use(cookieParser());

  app.use(
    cors({
      origin: env === 'development' ? 'http://localhost:3000' : '',
      credentials: true,
    })
  );

  //10000000 = 10mb tamaño maximo de archivos
  app.use('/graphql', graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 3 }));

  //maneja refresh tokens por cada request
  app.use(async (req, res, next) => await manageTokens(req, res, next));

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Auth, Post],
    }),
    debug: true,
    tracing: true,
    uploads: false,
    formatError: (error: GraphQLError) => error,
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(`SERVER STARTED\nPORT:${PORT}`);
  });
})().catch((err) => {
  console.error(`SERVER ERROR:\n${err}`);
});
