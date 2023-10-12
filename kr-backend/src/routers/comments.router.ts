import {Router} from "express";
import {addByMovieId, deleteById, getAllByMovieId} from "../controllers/comments.controller";

const router = Router();

router.get("/:movieId", getAllByMovieId);
router.post("/", addByMovieId);
router.delete("/:id", deleteById);

export const commentsRouter = router;