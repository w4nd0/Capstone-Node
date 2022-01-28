import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import ListAddressService from "../../services/Address/ListAddress.service";

export const list = async (request: Request, response: Response) => {
    const listAddressService = new ListAddressService();
    const addresses = await listAddressService.execute({
        userId: request.user.id,
    });
  
    return response.json(instanceToInstance(addresses));
};