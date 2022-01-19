import { Request, Response } from "express";
import RetriveProductService from "../../services/Products/retriveProduct.service";

class RetriveProductController {
  async handle(request: Request, response: Response) {
    const retriveProductService = new RetriveProductService();

    const { id } = request.params;

    const product = await retriveProductService.execute(id);

    return response.json(product);
  }
}

export default RetriveProductController;
