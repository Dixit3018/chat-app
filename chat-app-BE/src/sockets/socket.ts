import { Server } from "socket.io";
import { Socket } from "socket.io";
import Message, { IMessage } from "../models/Message";

export function initializeSocket(server: any) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.on("message", async (data: IMessage) => {
      const newMsg = new Message({
        receiver: data.receiver,
        sender: data.sender,
        message: data.message,
      });
      await newMsg.save();
      if(data.receiver !== data.sender){
        io.emit(data.receiver, data);
      }
    });
  });

  return io;
}
