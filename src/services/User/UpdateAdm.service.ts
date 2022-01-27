import { getRepository } from "typeorm";
import User from "../../entities/User";
import AppError from "../../errors/AppError";

interface Request {
    email: string;
    isAdm: boolean;
};

export default class UpdateAdmService {
    public async execute({ email, isAdm }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            email,
            isActive: true,
        }).catch((e) => { throw new AppError(e.message) });
    
        if (!user) throw new AppError("User not found.", 404);
      
        user.isAdm = isAdm;
        
        await userRepository.save(user);

        return user;
    };
};