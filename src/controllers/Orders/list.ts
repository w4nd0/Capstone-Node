import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import ListOrdersService from "../../services/Orders/ListOrder.service";

export const list = async (request: Request, response: Response) => {
  const listOrdersService = new ListOrdersService();

  const { idUser } = request.query;

  const listOrders = await listOrdersService.execute({
    userId: request.user.id,
    idUser,
  });

  return response.json(instanceToInstance(listOrders));
};
