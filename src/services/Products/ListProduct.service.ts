import Product from "../../entities/Product";
import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

class ListProductsService {
  async execute(): Promise<Product[] | Error> {
    try {
      const productsRepository = getRepository(Product);

      const products = productsRepository.find();

      return products;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }
}

export default ListProductsService;
