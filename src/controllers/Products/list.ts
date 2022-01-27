import { Request, Response } from "express";
import ListProductsService from "../../services/Products/ListProduct.service";

export const list = async (request: Request, response: Response) => {
  const listProductsService = new ListProductsService();

  const listProducts = await listProductsService.execute();

  return response.json(listProducts);
};
