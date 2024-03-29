import { NextFunction, Request, Response } from "express";

import { EActionTokenTypes } from "../enums/action-token-type.enum";
import { ETokenType } from "../enums/token-type.enum";
import { ApiError } from "../errors";
import { Action } from "../models/Action.model";
import { Token } from "../models/Token.model";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("No token", 401);
      }

      const payload = tokenService.checkToken(accessToken, ETokenType.Access);

      const entity = await Token.findOne({ accessToken });
      if (!entity) {
        throw new ApiError("Token not valid", 401);
      }

      req.res.locals.tokenPayload = payload;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) {
        throw new ApiError("No token", 401);
      }

      const payload = tokenService.checkToken(refreshToken, ETokenType.Refresh);

      const entity = await Token.findOne({ refreshToken });
      if (!entity) {
        throw new ApiError("Token not valid", 401);
      }

      req.res.locals.oldTokenPair = entity;
      req.res.locals.tokenPayload = { name: payload.name, _id: payload._id };
      next();
    } catch (e) {
      next(e);
    }
  }

  public checkActionToken(tokenType: EActionTokenTypes) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const actionToken = req.params.token;

        if (!actionToken) {
          throw new ApiError("Token is not provided", 400);
        }
        const jwtPayload = tokenService.checkActionToken(
          actionToken,
          tokenType
        );

        const tokenFromDb = await Action.findOne({ actionToken });

        if (!tokenFromDb) {
          throw new ApiError("Token is invalid", 400);
        }

        req.res.locals = { jwtPayload, tokenFromDb };

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();
