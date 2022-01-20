import { Request, Response } from "express";
import ListOrdersService from "../../services/Orders/listOrder.service";

export const list = async (request: Request, response: Response) => {
  const listOrdersService = new ListOrdersService();

  const listOrders = await listOrdersService.execute();

  return response.json(listOrders);
};
