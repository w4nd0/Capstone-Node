import authConfig from "../../config/auth";
import { verify } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import AppError from "../../errors/AppError";
import { getRepository } from "typeorm";
import User from "../../entities/User";

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export const admAuth = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("Missing authorization headers", 401);
    };

    try {
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

        if (!user) {
            throw new AppError("JWT Expired or sended in a wrong way");
        }

        if (!user.isAdm) {
            throw new AppError("Unauthorized", 401);
        }
    
        request.user = {
          id: sub,
        };
    
        return next();
    } catch (err) {
        if (err instanceof AppError) {
            throw new AppError(err.message, err.statusCode)
        };
        console.error(err)

        throw new AppError("Internal Error", 500);
    };
};
