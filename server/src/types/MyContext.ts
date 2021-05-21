import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';

export interface MyContext {
  req: Request;
  res: Response;
  entityManager: EntityManager;
}
