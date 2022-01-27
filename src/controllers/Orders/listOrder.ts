import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import ListOrdersService from "../../services/Orders/ListOrder.service";

export const list = async (request: Request, response: Response) => {
  const listOrdersService = new ListOrdersService();

  const listOrders = await listOrdersService.execute({
    userId: request.user.id,
  });

  return response.json(instanceToInstance(listOrders));
};
