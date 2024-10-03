import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    image: string;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
