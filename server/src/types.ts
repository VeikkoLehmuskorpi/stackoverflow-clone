import { Connection } from 'typeorm';
import { Request, Response } from 'express';
import { Redis } from 'ioredis';

export interface MyContext {
  orm: Connection;
  req: Request & { session?: Express.Session };
  res: Response;
  redis: Redis;
}
