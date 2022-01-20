import { Request, Response } from "express";
import CreateProductService from "../../services/Products/createProduct.service";

export const create = async (request: Request, response: Response) => {
  const createProductService = new CreateProductService();

  const newProduct = await createProductService.execute(request.body);

  return response.status(201).json(newProduct);
};
