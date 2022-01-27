import Product from "../../entities/Product";
import { getRepository } from "typeorm";

interface IProduct {
  name: string;
  description: string;
  price: number;
}

class CreateProductService {
  async execute(product: IProduct): Promise<Product | Error> {
    const productsRepository = getRepository(Product);

    const newProduct = productsRepository.create({ ...product });

    await productsRepository.save(newProduct);

    return newProduct;
  }
}

export default CreateProductService;
