import { Document, Types } from "mongoose";

export interface IComment extends Document {
    userId: Types.ObjectId;
    userName: string;
    movieId: string;
    text: string;
    createdAt: Date;
}
