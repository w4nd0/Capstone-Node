import { getRepository } from "typeorm";
import User from "../../entities/User";

export default class ListUserService {
    public async execute(): Promise<User[]> {
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            where: {
                isActive: true,
            }
        });

        return users;
    };
};