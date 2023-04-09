import { IncomingMessage, ServerResponse } from 'http';
import { Db } from 'mongodb';

export interface Context {
  db: Db;
  req: IncomingMessage;
  res: ServerResponse;
}
