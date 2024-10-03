import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  sender: string;
  receiver: string;
  message: string;
}

const MessageSchema: Schema = new Schema(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    deleted: { type: Boolean, required: true, default: false },
    edited: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
