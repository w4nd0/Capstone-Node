import { Request, Response } from "express";
import DeleteProductService from "../../services/Products/deleteProduct.service";

class DeleteProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute(id);

    return response.status(204).json();
  }
}

export default DeleteProductController;
