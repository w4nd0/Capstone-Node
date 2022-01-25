import Product from "../../entities/Product";
import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

class RetrieveProductService {
  async execute(id: string): Promise<Product | Error> {
    const productsRepository = getRepository(Product);

    const product = await productsRepository
      .findOneOrFail({ id })
      .catch((error: any) => {
        throw new AppError("Product not found");
      });

    return product;
  }
}
export default RetrieveProductService;
