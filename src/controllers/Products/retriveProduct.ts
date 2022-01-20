import { Request, Response } from "express";
import RetriveProductService from "../../services/Products/retriveProduct.service";

export const retrive = async (request: Request, response: Response) => {
  const retriveProductService = new RetriveProductService();

  const { id } = request.params;

  const product = await retriveProductService.execute(id);

  return response.json(product);
};
