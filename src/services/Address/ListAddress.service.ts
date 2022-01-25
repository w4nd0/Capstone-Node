import { getRepository } from "typeorm";
import Address from "../../entities/Address";
import AppError from "../../errors/AppError";

interface Request {
    userId: string;
};

export default class ListAddressService {
    public async execute({ userId }: Request): Promise<Address[]> {
        const addressRepository = getRepository(Address);
        const addresses = await addressRepository.find({
            where: {
                userId,
            }
        })

        if (!addresses) throw new AppError("Addresses not found.");

        return addresses;
    }
};