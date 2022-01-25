import { getRepository } from "typeorm";
import Address from "../../entities/Address";
import AppError from "../../errors/AppError";

interface Request {
    id: string;
    userId: string;
};

export default class RetrieveAddressService {
    public async execute({ id, userId }: Request): Promise<Address> {
        const addressRepository = getRepository(Address);
        const address = await addressRepository.findOne({
            where: {
                id,
            }
        })

        if (!address) throw new AppError("Address not found.");

        if (address.userId !== userId) throw new AppError("Unauthorized", 401);

        return address;
    }
};