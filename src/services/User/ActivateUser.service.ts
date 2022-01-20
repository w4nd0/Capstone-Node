import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import User from "../../entities/User";
import AppError from "../../errors/AppError";

interface Request {
    email: string;
    password: string;
}

export default class ActivateUserService {
    public async execute({ email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
            where: {
                email,
                isActive: false,
            }
        });

        if (!user) throw new AppError("User not found.")

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
          throw new AppError("Wrong email/password", 401);
        };
    
        user.isActive = true;

        await userRepository.save(user);

        return user;
    };
};