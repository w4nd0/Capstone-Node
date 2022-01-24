import { getRepository } from "typeorm";
import Address from "../../entities/Address";
import AppError from "../../errors/AppError";

interface Request {
    id: string;
};

export default class ListAddressService {
    public async execute({ id }: Request): Promise<Address> {
        const addressRepository = getRepository(Address);
        const address = await addressRepository.findOne({
            where: {
                id,
            }
        })

        if (!address) throw new AppError("Address not found.");

        return address;
    }
};