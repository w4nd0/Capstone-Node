import { Request, Response } from "express";
import RetrieveAddressService from "../../services/Address/RetrieveAddress.service";

export const retrieve = async (request: Request, response: Response) => {
    const { id } = request.params;

    const retrieveAddressService = new RetrieveAddressService();
    const address = await retrieveAddressService.execute({
        id,
        userId: request.user.id,
    });
  
    return response.json(address);
};