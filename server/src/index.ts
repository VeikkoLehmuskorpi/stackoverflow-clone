import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import morgan from 'morgan';
import cors from 'cors';
// import helmet from 'helmet';
import { PostResolver } from './resolver/Post';
import { UserResolver } from './resolver/User';

dotenv.config();

const main = async () => {
  const orm = await createConnection();

  const app = express();
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  // app.use(helmet());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
    }),
    context: () => ({ orm }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(process.env.SERVER_PORT, () => {
    console.log(
      `Server ready on http://localhost:${process.env.SERVER_PORT}${apolloServer.graphqlPath}`
    );
  });
};

main().catch(err => console.error(err));
