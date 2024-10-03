import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../../models/User";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { isValidObjectId } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { generateToken, verifyToken } from "../../utility/auth";
import { authenticateToken } from "../../middlewares/auth.middleware";
import { getUserIdFromToken } from "../../utility/util";
import multer from "multer";
import cloudinaryStorage from "multer-storage-cloudinary";
import Message from "../../models/Message";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

dotenv.config();

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
});

const upload = multer({ storage: storage });

// Upload image
export const uploadImage = [
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file as { secure_url: string } | undefined;

    if (file) {
      const file = req.file as unknown as { secure_url: string };
      req.body.imageUrl = file.secure_url;
      next();
    } else {
      res.status(400).json({ message: "No file uploaded" });
    }
  },
];

// Create User
export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const alreadyExistsUsername = await User.findOne({ username });
    if (alreadyExistsUsername) {
      throw new Error("Username already exists");
    }

    const alreadyExistsEmail = await User.findOne({ email });
    if (alreadyExistsEmail) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl: string | undefined;
    if (req.file) {
      imageUrl = req.file.path;
    }

    const user = new User({
      username,
      email,
      password: hashedPassword,
      image: imageUrl,
    });
    await user.save();

    const userData = user.toObject({
      versionKey: false,
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    });

    const token = generateToken(user._id.toString());
    res.status(201).json({ user: userData, token });
  } catch (error: unknown) {
    error instanceof Error
      ? res.status(400).json({ message: error.message, status: 400 })
      : res
          .status(500)
          .json({ message: "Internal server error.", status: 500 });
  }
};

// Get Users
export const getUsers = [
  authenticateToken as any,
  async (req: Request, res: Response) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1] ?? "";

      const decoded = verifyToken(token);

      const authUserID = decoded.id;

      const users: IUser[] = await User.find().select("-password -__v");

      const usersWithLastMessage = await Promise.all(users.map(async (user) => {
        const lastMessage = await Message.findOne({
          $or: [
            { sender: user._id, receiver: authUserID },
            { sender: authUserID, receiver: user._id }
          ]
        })
        .sort({ createdAt: -1 })
        .select('message createdAt')
        .exec();

        return {
          ...user.toObject(),
          lastMessage: lastMessage ? lastMessage : null,
        };
      }));

      res.status(200).json(usersWithLastMessage);
    } catch (error: unknown) {
      error instanceof Error
        ? res.status(400).json({ message: error.message, status: 400 })
        : res
            .status(500)
            .json({ message: "Internal server error.", status: 500 });
    }
  },
];

// Get profile details
export const getProfileDetails = [
  authenticateToken as any,
  async (req: Request, res: Response) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized", status: 401 });
      }

      const userId = getUserIdFromToken(token);

      const user = await User.findById(userId).select("-password -__v");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error: unknown) {
      error instanceof Error
        ? res.status(400).json({ message: error.message, status: 400 })
        : res
            .status(500)
            .json({ message: "Internal server error.", status: 500 });
    }
  },
];

// Get profile details by user ID
export const getProfileDetailsByUserID = [
  authenticateToken as any,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        throw Error("Invalid UserId format");
      }

      if (!id) {
        throw Error("UserId is required");
      }

      const user = await User.findById(id).select("-password -__v");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error: unknown) {
      error instanceof Error
        ? res.status(400).json({ message: error.message, status: 400 })
        : res
            .status(500)
            .json({ message: "Internal server error.", status: 500 });
    }
  },
];
