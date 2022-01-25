import Product from "../../entities/Product";
import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

interface IProduct {
  name: string;
  description: string;
  price: number;
}

class CreateProductService {
  async execute(product: IProduct): Promise<Product | Error> {
    try {
      const productsRepository = getRepository(Product);

      const newProduct = productsRepository.create({ ...product });

      await productsRepository.save(newProduct);

      return newProduct;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }
}

export default CreateProductService;
