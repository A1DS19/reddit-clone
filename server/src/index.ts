import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import express from 'express';
import { Auth } from './resolvers/Auth';

(async () => {
  await createConnection();

  const app = express();
  const PORT = process.env.PORT || 4000;

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Auth],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(`SERVER STARTED\nPORT:${PORT}`);
  });
})().catch((err) => {
  console.error(`SERVER ERROR:\n${err}`);
});
