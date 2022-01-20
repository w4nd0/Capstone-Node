import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";
import { compare } from "bcryptjs";
import authConfig from "../../config/auth";
import { sign } from "jsonwebtoken";
import User from "../../entities/User";

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
}

export default class AuthService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {
                email,
            }
        });

        if (!user) throw new AppError("Wrong email/password", 401);

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) throw new AppError("Wrong email/password", 401);

        const { expiresIn, secret } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            token,
        };
    }
};
