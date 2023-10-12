import {IComment} from "../types/comment.type";
import {Comment} from "../models/Comment.model";

export const findByMovieId = (id: string): Promise<IComment[]> => {
    return Comment.find({movieId: id});
}

export const createOneByMovieId = (data: IComment): Promise<IComment> => {
    return Comment.create(data);
}

export const findByIdAndDelete = async (id: string, userId: string): Promise<IComment> | null => {
    try {
        const comment = await Comment.findById(id);

        if (comment.userId.toString() === userId) {
            return Comment.findByIdAndDelete(id);
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
    }
}