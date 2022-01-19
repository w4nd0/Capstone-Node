import { Request, Response } from "express";
import ListProductsService from "../../services/Products/listProduct.service";

class ListProductsController {
  async handle(request: Request, response: Response) {
    const listProductsService = new ListProductsService();

    const listProducts = await listProductsService.execute();

    return response.json(listProducts);
  }
}

export default ListProductsController;
