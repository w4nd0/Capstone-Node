import { Request, Response } from "express";
import RetrieveOrderService from "../../services/Orders/retrieveOrder.service";

export const retrieve = async (request: Request, response: Response) => {
  const retrieveOrderService = new RetrieveOrderService();

  const { id } = request.params;

  const order = await retrieveOrderService.execute(id);

  return response.json(order);
};
