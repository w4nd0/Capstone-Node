import Product from "../../entities/Product";
import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

interface IProduct {
  name?: string;
  description?: string;
  price?: number;
}

class UpdateProductService {
  async execute(id: string, data: IProduct): Promise<Product | Error> {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne({ id });

    if (!product) {
      throw new AppError("Product not found");
    }

    await productsRepository.update(id, data);

    return await productsRepository
      .findOneOrFail({ id })
      .catch((error: any) => {
        throw new AppError(error.message);
      });
  }
}

export default UpdateProductService;
