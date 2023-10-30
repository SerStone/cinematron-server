import { model, Schema } from "mongoose";

import { EGenders } from "../enums/user.enum";
import { EUserStatus } from "../enums/user-status.enum";

const FavoriteMovie = new Schema({
    movieId: {
        type: String,
        required: true,
    },
    release_date: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    poster_path: {
        type: String,
        required: false,
    },
    vote_average: {
        type: String,
        required: false,
    },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      min: [1, "Minimum value for age is 1"],
      max: [199, "Maximum value for age is 199"],
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    status: {
      type: String,
      default: EUserStatus.Inactive,
      enum: EUserStatus,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
      required: false,
    },
      favoriteMovies: [FavoriteMovie]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("user", userSchema);
