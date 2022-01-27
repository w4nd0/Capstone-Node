import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import updateOrdersservice from "../../services/Orders/UpdateOrder.service";

export const update = async (request: Request, response: Response) => {
  const data = request.body;

  const { id } = request.params;

  const updateOrderservice = new updateOrdersservice();

  const updateOrder = await updateOrderservice.execute({ id, ...data });

  return response.json(instanceToInstance(updateOrder));
};
