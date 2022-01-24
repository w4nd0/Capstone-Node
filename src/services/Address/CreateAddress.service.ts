import { getRepository } from "typeorm";
import Address from "../../entities/Address";

interface Request {
    userId: string;
    city: string;
    street: string;
    number: number;
};

export default class CreateAddressService {
    public async execute({ city, street, number, userId }: Request): Promise<Address> {
        const addressRepository = getRepository(Address);
        const address = addressRepository.create({
            user: {
                id: userId,
            },
            city,
            street,
            number,
        });

        await addressRepository.save(address);

        return address;
    }
};
