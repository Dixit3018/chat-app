import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { authenticateToken } from "../../middlewares/auth.middleware";
import { getUserIdFromToken } from "../../utility/util";
import Message from "../../models/Message";

export const sendMessage = async (req: Request, res: Response) => {
  const { senderId, receiverId, message } = req.body;
  try {
    const messageData = new Message({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    res.status(201);
  } catch (error: unknown) {
    error instanceof Error
      ? res.status(400).json({ message: error.message, status: 400 })
      : res
          .status(500)
          .json({ message: "Internal server error.", status: 500 });
  }
};

export const getMessages = [
  authenticateToken as any,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized", status: 401 });
      }

      if (!isValidObjectId(id)) {
        return res
          .status(401)
          .json({ message: "Not a valid user", status: 404 });
      }

      const receiverId = id;
      const senderId = getUserIdFromToken(token);

      if (!isValidObjectId(receiverId)) {
        throw Error("Invalid receiver id");
      }

      // Retrieve messages between sender and receiver
      const messageData = await Message.find({
        $or: [
          { sender: senderId, receiver: receiverId, deleted: false },
          { sender: receiverId, receiver: senderId, deleted: false },
        ],
      }).sort({ createdAt: 1 }); // Sort by creation date, oldest first

      return res.status(200).json({ messages: messageData ?? [], status: 200 });
    } catch (error: unknown) {
      error instanceof Error
        ? res.status(400).json({ error: error.message, status: 400 })
        : res
            .status(500)
            .json({ error: "Internal server error.", status: 500 });
    }
  },
];

export const deleteMessage = [
  authenticateToken as any,
  async (req: Request, res: Response) => {
    try {
      const { messageId, message, receiverId } = req.body;

      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ error: "Unauthorized", status: 401 });
      }

      const senderId = getUserIdFromToken(token);

      await Message.findOneAndUpdate(
        {
          _id: messageId,
          sender: senderId,
          receiver: receiverId,
          deleted: false,
        },
        { deleted: true },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Message deleted successfully", status: 200 });
    } catch (error: unknown) {
      error instanceof Error
        ? res.status(400).json({ error: error.message, status: 400 })
        : res
            .status(500)
            .json({ error: "Internal server error.", status: 500 });
    }
  },
];

export const updateMessage = [
  authenticateToken as any,
  async (req: Request, res: Response) => {
    try {
      const { messageId, message, receiverId } = req.body;

      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized", status: 401 });
      }

      const senderId = getUserIdFromToken(token);

      const result = await Message.findOneAndUpdate(
        {
          _id: messageId,
          sender: senderId,
          receiver: receiverId,
        },
        { message, edited: true },
        { new: true }
      );

      return res.status(200).json({
        message: "Message updated successfully",
        status: 200,
        data: result,
      });
    } catch (error: unknown) {
      error instanceof Error
        ? res.status(400).json({ message: error.message, status: 400 })
        : res
            .status(500)
            .json({ message: "Internal server error.", status: 500 });
    }
  },
];

export const deleteAllMessages = [
  authenticateToken as any,
  async (req: Request, res: Response) => {
    try {
      const { receiverId } = req.params;

      if (!isValidObjectId(receiverId)) {
        return res.status(400).json({ message: "A valid user id is required" });
      }

      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized", status: 401 });
      }

      const senderId = getUserIdFromToken(token);

      const result = await Message.updateMany(
        {
          sender: senderId,
          receiver: receiverId,
          deleted: false,
        },
        { deleted: true }
      );

      return res
        .status(200)
        .json({ message: "Messages deleted successfully", status: 200 });
    } catch (error: unknown) {
      error instanceof Error
        ? res.status(400).json({ message: error.message, status: 400 })
        : res
            .status(500)
            .json({ message: "Internal server error.", status: 500 });
    }
  },
];
