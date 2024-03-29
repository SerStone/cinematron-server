import { NextFunction, Request, Response } from "express";

import { User } from "../models/User.model";
import { authService } from "../services/auth.service";
import { ITokenPair, ITokenPayload } from "../types/token.types";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      await authService.register(req.body);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async activate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { jwtPayload } = req.res.locals;

      await authService.activate(jwtPayload);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokenPair>> {
    try {
      const user = await User.findOne({ email: req.body.email });
      const tokensPair = await authService.login(req.body, req.res.locals.user);

      return res.status(200).json({
        ...tokensPair,
        user: user.toObject(),
      });
    } catch (e) {
      next(e);
    }
  }

  public async changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokenPair>> {
    try {
      const { _id: userId } = req.res.locals.tokenPayload as ITokenPayload;

      await authService.changePassword(req.body, userId);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokenPair>> {
    try {
      const oldTokenPair = req.res.locals.oldTokenPair as ITokenPair;
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;

      const tokensPair = await authService.refresh(oldTokenPair, tokenPayload);

      return res.status(200).json(tokensPair);
    } catch (e) {
      next(e);
    }
  }
  public async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { user } = res.locals;
      await authService.forgotPassword(user._id, req.body.email);

      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  public async setForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { password } = req.body;
      const { jwtPayload } = req.res.locals;

      await authService.setForgotPassword(
        password,
        jwtPayload._id,
        req.params.token
      );

      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
