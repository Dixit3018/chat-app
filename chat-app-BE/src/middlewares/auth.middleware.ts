import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isBlacklisted } from '../utility/blacklist';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token || isBlacklisted(token)) {
    return res.sendStatus(401);
  }

  if (!token) return res.sendStatus(401); 
    jwt.verify(token, SECRET_KEY, (err: any) => {
    if (err) return res.sendStatus(401);
    next();
  });
};
