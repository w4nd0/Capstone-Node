import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import AppError from "../../errors/AppError";
import User from "../../entities/User";
import Token from "../../entities/Token";

interface Request {
    token: string;
    password: string;
    confirmation: string;
};

export default class UpdatePasswordService {
    public async execute({
        confirmation,
        password,
        token,
    }: Request): Promise<User> {
        const tokenRepository = getRepository(Token);
        const findToken = await tokenRepository.findOne({
            where: {
                token,
            }
        })

        if (!findToken) {
            throw new AppError("Invalid Token.")
        };

        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
            where: {
                id: findToken.userId,
            }
        });

        if (!user) {
            throw new AppError("User does not exist");
        };
        
        if (password !== confirmation) {
            throw new AppError("Password and Confirmation don't match.")
        };

        const hashedPassword = await hash(password, 8);
    
        hashedPassword ? (user.password = hashedPassword) : user.password;

        await userRepository.save(user);
        await tokenRepository.delete(findToken.id);

        return user;
    };
};
