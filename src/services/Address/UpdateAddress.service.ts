import { getRepository } from "typeorm";
import Address from "../../entities/Address";
import AppError from "../../errors/AppError";

interface IAddress {
    city?: string;
    street?: string;
    number?: number;
}

interface Request {
    userId: string;
    id: string;
    addressData: IAddress;
};

export default class UpdateAddressService {
    public async execute({ addressData, id, userId }: Request): Promise<Address> {
        const addressRepository = getRepository(Address);
        const address = await addressRepository.findOne({
            where: { id }
        });

        if (!address) throw new AppError("Address not found.");

        if (address.userId !== userId) throw new AppError("Unauthorized", 401);

        addressData.city ? (address.city === addressData.city) : address.city
        addressData.street ? (address.street === addressData.street) : address.street
        addressData.number ? (address.number === addressData.number) : address.number

        await addressRepository.save(address);

        return address;
    }
};