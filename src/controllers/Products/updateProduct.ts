import { Request, Response } from "express";
import UpdateProductsService from "../../services/Products/updateProduct.service";

class UpdateProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const data = request.body;

    const updateProductService = new UpdateProductsService();

    const updateProduct = await updateProductService.execute(id, data);

    return response.json(updateProduct);
  }
}

export default UpdateProductController;
