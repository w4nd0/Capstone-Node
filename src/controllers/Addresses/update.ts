import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import UpdateAddressService from "../../services/Address/UpdateAddress.service";

export const update = async (request: Request, response: Response) => {
  const { id } = request.params;

  const updateAddressService = new UpdateAddressService();
  const address = await updateAddressService.execute({
    id,
    userId: request.user.id,
    addressData: request.body,
  });

  return response.json(instanceToInstance(address));
};
