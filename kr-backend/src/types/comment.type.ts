import { Document, Types } from "mongoose";

export interface IComment extends Document {
    userId: Types.ObjectId;
    movieId: string;
    text: string;
    createdAt: Date;
}
