import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getUserIdFromToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as {
    id: string;
  };
  return decoded.id;
};
