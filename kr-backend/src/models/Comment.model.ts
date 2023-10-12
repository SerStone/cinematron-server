import { model, Schema } from "mongoose";
import * as mongoose from "mongoose";
import {IComment} from "../types/comment.type";

const commentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

export const Comment = model<IComment>("comment", commentSchema);