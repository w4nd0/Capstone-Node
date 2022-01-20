import { Request, Response } from "express";
import RetrieveProductService from "../../services/Products/retrieveProduct.service";

export const retrieve = async (request: Request, response: Response) => {
  const retrieveProductService = new RetrieveProductService();

  const { id } = request.params;

  const product = await retrieveProductService.execute(id);

  return response.json(product);
};
