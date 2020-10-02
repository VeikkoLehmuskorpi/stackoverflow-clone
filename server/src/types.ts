import { Connection } from 'typeorm';
import { Request, Response } from 'express';

export interface MyContext {
  orm: Connection;
  req: Request & { session?: Express.Session };
  res: Response;
}
