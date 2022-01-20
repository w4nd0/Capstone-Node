import { Request, Response } from "express";
import DeleteOrderService from "../../services/Orders/deleteOrder.service";

export const destroy = async (request: Request, response: Response) => {
  const { id } = request.params;

  const deleteOrderService = new DeleteOrderService();

  await deleteOrderService.execute(id);

  return response.status(204).json();
};
