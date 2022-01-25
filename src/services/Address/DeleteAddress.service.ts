import { DeleteResult, getRepository } from "typeorm";
import Address from "../../entities/Address";
import AppError from "../../errors/AppError";

interface Request {
    id: string;
    userId: string;
};

export default class DeleteAddressService {
    public async execute({ id, userId }: Request): Promise<DeleteResult> {
        const addressRepository = getRepository(Address);
        const address = await addressRepository.findOne({
            where: {
                id,
            }
        })

        if (!address) throw new AppError("Address not found.", 404);
        
        if (address.userId !== userId) throw new AppError("Unauthorized", 401);

        return addressRepository.delete(id);
    }
};