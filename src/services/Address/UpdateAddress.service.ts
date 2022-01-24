import { getRepository } from "typeorm";
import Address from "../../entities/Address";
import AppError from "../../errors/AppError";

interface Request {
    id: string;
    city?: string;
    street?: string;
    number?: number;
};

export default class UpdateAddressService {
    public async execute({ city, street, number, id }: Request): Promise<Address> {
        const addressRepository = getRepository(Address);
        const address = await addressRepository.findOne({
            where: { id }
        });

        if (!address) throw new AppError("Address not found.");

        city ? (address.city === city) : address.city
        street ? (address.street === street) : address.street
        number ? (address.number === number) : address.number

        await addressRepository.save(address);

        return address;
    }
};