import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { PostResolver } from './resolver/Post';
import { UserResolver } from './resolver/User';
import { __prod__ } from './constants';
import { MyContext } from './types';

dotenv.config();

const main = async () => {
  // Init database connection
  const orm = await createConnection();

  // Init Express server
  const app = express();

  // Init redis
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  // Load Express middleware
  app.use(express.json());
  app.use(cors());
  app.use(
    session({
      name: `${process.env.SESSION_NAME}`,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years,
        httpOnly: true,
        secure: __prod__ ? true : false,
        sameSite: 'lax',
      },
      secret: `${process.env.SESSION_SECRET}`,
      resave: false,
      saveUninitialized: false,
    })
  );

  // Init Apollo server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
    }),
    context: ({ req, res }): MyContext => ({ orm, req, res }),
  });

  // Load Apollo middleware
  apolloServer.applyMiddleware({ app });

  // Start the server
  app.listen(process.env.SERVER_PORT, () => {
    console.log(
      `Server ready on http://localhost:${process.env.SERVER_PORT}${apolloServer.graphqlPath}`
    );
  });
};

main().catch(err => console.error(err));
