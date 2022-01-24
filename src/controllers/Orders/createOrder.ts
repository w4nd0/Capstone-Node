import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import CreateOrderService from "../../services/Orders/createOrder.service";

export const create = async (request: Request, response: Response) => {
  const createOrderService = new CreateOrderService();

  const newOrder = await createOrderService.execute(request.body);

  return response.json(instanceToInstance(newOrder));
};
