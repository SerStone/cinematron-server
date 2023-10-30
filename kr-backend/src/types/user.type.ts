import { Document } from "mongoose";

export interface IFavoriteMovie {
  movieId: string;
  release_date?: string;
  title: string;
  poster_path?: string;
  vote_average?: string;
}

export interface IUser extends Document {
  name?: string;
  age?: number;
  gender?: string;
  email: string;
  avatar?: string;
  password: string;
  favoriteMovies?: IFavoriteMovie[];
}