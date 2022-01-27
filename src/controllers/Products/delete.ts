import { Request, Response } from "express";
import DeleteProductService from "../../services/Products/DeleteProduct.service";

export const destroy = async (request: Request, response: Response) => {
  const { id } = request.params;

  const deleteProductService = new DeleteProductService();

  await deleteProductService.execute(id);

  return response.status(204).json();
};
