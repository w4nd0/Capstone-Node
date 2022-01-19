import Product from "../../entities/Product";
import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

class DeleteProductService {
  async execute(id: string) {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne({ id });

    if (!product) {
      throw new AppError("Product not found");
    }

    return await productsRepository.delete(id);
  }
}

export default DeleteProductService;
