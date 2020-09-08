import { Connection } from 'typeorm';

export interface MyContext {
  orm: Connection;
}
