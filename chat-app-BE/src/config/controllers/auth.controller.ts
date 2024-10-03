import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { IUser } from "../../models/User";
import { generateToken } from "../../utility/auth";
import { addToBlacklist } from "../../utility/blacklist";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user: IUser | null = await User.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({ user, token });
  } catch (error: unknown) {
    error instanceof Error
      ? res.status(400).json({ message: error.message, status: 400 })
      : res
          .status(500)
          .json({ message: "Internal server error.", status: 500 });
  }
};

export const logout = (req: Request, res: Response) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  try {
    if (!token) {
      throw new Error("Unauthorized");
    }

    addToBlacklist(token);
    return res.status(200).json({ message: "Logged out successfully", status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message, status: 400 });
    } else {
      return res.status(500).json({ error: "Internal server error.", status: 500 });
    }
  }
};
