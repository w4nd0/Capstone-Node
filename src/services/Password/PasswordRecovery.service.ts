import {getRepository } from "typeorm";
import Token from "../../entities/Token";
import crypto from "crypto";
import { hash } from "bcryptjs";
import AppError from "../../errors/AppError";
import User from "../../entities/User";

interface Request {
    email: string;
};

export default class PasswordResetTokenService {
    public async execute({
        email,
    }: Request): Promise<Token> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
            where: {
                email,
            }
        });
        if (!user) {
            throw new AppError("User does not exist", 404);
        };

        const tokenRepository = getRepository(Token);
        const token = await tokenRepository.findOne({
            where: {
                userId: user.id
            }
        })
        
        if (token) {
            await tokenRepository.delete(token.id);
        };
        
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await hash(resetToken, 8);
        
        const newToken = tokenRepository.create({
            userId: user.id,
            token: hashedToken,
        });
        
        await tokenRepository.save(newToken);

        return newToken;
    };
};
