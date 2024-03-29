import { configs } from "../configs/config";
import { IUser } from "../types/user.type";

class UserMapper {
  public toResponse(user: IUser) {
    return {
      _id: user._id,
      name: user.name,
      age: user.age,
      gender: user.gender,
      email: user.email,
      avatar: user.avatar ? `${configs.AWS_S3_URL}/${user.avatar}` : null,
      favoriteMovies: user.favoriteMovies,
    };
  }
}

export const userMapper = new UserMapper();
