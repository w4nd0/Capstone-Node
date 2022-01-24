import { DeleteResult, getRepository } from "typeorm";
import Address from "../../entities/Address";
import AppError from "../../errors/AppError";

interface Request {
    id: string;
};

export default class DeleteAddressService {
    public async execute({ id }: Request): Promise<DeleteResult> {
        const addressRepository = getRepository(Address);
        const address = await addressRepository.findOne({
            where: {
                id,
            }
        })

        if (!address) throw new AppError("Address not found.");

        return addressRepository.delete(id);
    }
};