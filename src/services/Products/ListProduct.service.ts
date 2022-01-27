import Product from "../../entities/Product";
import { getRepository } from "typeorm";

class ListProductsService {
  async execute(): Promise<Product[] | Error> {
    const productsRepository = getRepository(Product);

    const products = productsRepository.find();

    return products;
  }
}

export default ListProductsService;
