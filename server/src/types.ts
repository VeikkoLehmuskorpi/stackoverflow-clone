import { Connection } from 'typeorm';
import { Request, Response } from 'express';

export interface MyContext {
  orm: Connection;
  req: Request & { session?: Express.Session };
  res: Response;
}

export interface UniqueConstraintErr {
  property: String;
  constraints: {
    unique: String;
  };
}
