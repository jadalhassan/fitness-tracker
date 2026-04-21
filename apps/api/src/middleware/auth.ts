import type { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User.js";
import { ApiError } from "../lib/api-error.js";
import { verifyToken } from "../lib/auth.js";

export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return next(new ApiError(401, "Missing bearer token"));
  }

  const token = header.replace("Bearer ", "");
  const payload = verifyToken(token);
  const user = await UserModel.findById(payload.sub).lean();

  if (!user) {
    return next(new ApiError(401, "Invalid session"));
  }

  req.user = {
    id: String(user._id),
    email: user.email,
    fullName: user.fullName
  };

  return next();
}
