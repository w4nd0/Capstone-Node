import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import CreateOrderService from "../../services/Orders/createOrder.service";
import RetrieveOrderService from "../../services/Orders/retrieveOrder.service";

export const create = async (request: Request, response: Response) => {
  const createOrderService = new CreateOrderService();
  const retrieveOrderService = new RetrieveOrderService();

  const newOrder = await createOrderService.execute({
    userId: request.user.id,
    ...request.body,
  });

  return response.json(instanceToInstance(newOrder));
};
