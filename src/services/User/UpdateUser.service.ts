import { getRepository } from "typeorm";
import User from "../../entities/User";
import { hash } from "bcryptjs";
import AppError from "../../errors/AppError";

interface IUser {
    name?: string;
    email?: string;
    password?: string;
}

interface Request {
    id: string;
    userData: IUser;
};

export default class UpdateUserService {
    public async execute({ id, userData }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            id,
            isActive: true,
        });
    
        if (!user) throw new AppError("User not found.", 404);
      
        userData.name ? (user.name = userData.name) : user.name
        userData.email ? (user.email = userData.email) : user.email
        userData.password ? (user.password = await hash(userData.password, 8)) : user.password;

        await userRepository.save(user);

        return user;
    };
};