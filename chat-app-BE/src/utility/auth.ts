import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '8h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY)  as JwtPayload;
};
