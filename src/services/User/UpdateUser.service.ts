import { getRepository } from "typeorm";
import User from "../../entities/User";
import { hash } from "bcryptjs";
import AppError from "../../errors/AppError";

interface Request {
    id: string;
    name?: string;
    email?: string;
    password?: string;
};

export default class UpdateUserService {
    public async execute({ id, name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            id,
            isActive: true,
        });
    
        if (!user) throw new AppError("User not found.");
      
        name ? (user.name = name) : user.name
        email ? (user.email = email) : user.email
        password ? (user.password = await hash(password, 8)) : user.password;

        await userRepository.save(user);

        return user;
    };
};