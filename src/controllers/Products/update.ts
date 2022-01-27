import { Request, Response } from "express";
import UpdateProductsService from "../../services/Products/UpdateProduct.service";

export const update = async (request: Request, response: Response) => {
  const data = request.body;
  
  const { id } = request.params;

  const updateProductService = new UpdateProductsService();

  const updateProduct = await updateProductService.execute({ id, ...data });

  return response.json(updateProduct);
};
