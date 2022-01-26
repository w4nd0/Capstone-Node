import { getRepository } from "typeorm";
import User from "../../entities/User";
import AppError from "../../errors/AppError";

interface Request {
    id: string;
}

export default class RetrieveUserService {
    public async execute({ id }: Request): Promise<User> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
            where: {
                id,
                isActive: true,
            }
        });

        if (!user) throw new AppError("User not found.", 404)

        return user;
    };
};