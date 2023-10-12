import {NextFunction, Request, Response} from "express";
import {IComment} from "../types/comment.type";
import {createOneByMovieId, findByIdAndDelete, findByMovieId} from "../services/comment.service";

export const getAllByMovieId = async (req: Request, res: Response, next: NextFunction): Promise<Response<IComment[]>> => {
    try {
        const comments = await findByMovieId(req.params.movieId);

        return res.json(comments);
    } catch (e) {
        next(e);
    }
}

export const addByMovieId = async (req: Request, res: Response, next: NextFunction): Promise<Response<IComment> | void> => {
    const { userId, movieId, text } = req.body;
    const data: IComment = {
        userId: userId,
        movieId: movieId,
        text: text,
        createdAt: new Date
    } as IComment

    try {
        const comment = await createOneByMovieId(data);

        return res.json(comment);
    } catch (e) {
        next(e);
    }
}

export const deleteById = async (req: Request, res: Response, next: NextFunction): Promise<Response<IComment>> => {
    try {
        const deletedComment = await findByIdAndDelete(req.params.id, req.body.userId);

        return res.json(deletedComment);
    } catch (e) {
        console.log(e);
    }
}