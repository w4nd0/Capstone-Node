import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import CreateAddressService from "../../services/Address/CreateAddress.service";

export const create = async (request: Request, response: Response) => {
    const { city, street, number } = request.body;

    const createAddressService = new CreateAddressService();
    const address = await createAddressService.execute({
        userId: request.user.id,
        city,
        street,
        number,
    });
  
    return response.status(201).json(instanceToInstance(address));
};