import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import authConfig from "../../config/auth";
import User from "../../entities/User";
import AppError from "../../errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function userAuth(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT is missing", 401);
  };

  const [, token] = authHeader.split(" ");
  const { secret } = authConfig.jwt;

  const decoded = verify(token, secret);
  const { sub } = decoded as TokenPayload;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
      where: {
          id: sub,
      },
  });

  if (!user) throw new AppError("JWT Expired or sended in a wrong way");

  request.user = {
    id: sub,
  };

  return next();
}
