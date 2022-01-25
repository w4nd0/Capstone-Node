import { Request, Response } from "express";
import DeleteAddressService from "../../services/Address/DeleteAddress.service";

export const destroy = async (request: Request, response: Response) => {
    const { id } = request.params;

    const deleteAddressService = new DeleteAddressService();
    await deleteAddressService.execute({
        id,
        userId: request.user.id,
    });
  
    return response.status(204).json();
};