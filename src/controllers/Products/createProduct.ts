import { Request, Response } from "express";
import CreateProductService from "../../services/Products/createProduct.service";

class CreateProductController {
  async handle(request: Request, response: Response) {
    const createProductService = new CreateProductService();

    const newProduct = await createProductService.execute(request.body);

    return response.json(newProduct);
  }
}

export default CreateProductController;
