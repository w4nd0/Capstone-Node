import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import CreateOrderService from "../../services/Orders/CreateOrder.service";
import SendOrderEmailService from "../../services/Orders/SendOrderEmail.service";

export const create = async (request: Request, response: Response) => {
  const createOrderService = new CreateOrderService();
  const sendOrderEmailService = new SendOrderEmailService();

  const newOrder = await createOrderService
    .execute({
      userId: request.user.id,
      ...request.body,
    })
    .catch((e) => {
      throw new AppError("Error creating order", 404);
      return e;
    });

  await sendOrderEmailService.execute(newOrder);

  return response.status(201).json(instanceToInstance(newOrder));
};
