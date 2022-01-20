import Product from "../../entities/Product";
import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

interface IProduct {
  id: string;
  name?: string;
  description?: string;
  price?: number;
}

class UpdateProductService {
  async execute({
    id,
    name,
    description,
    price,
  }: IProduct): Promise<Product | Error> {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne({ id });
    if (!product) {
      throw new AppError("Not found any product with this id");
    }

    price ? (product.price = price) : product.price;
    name ? (product.name = name) : product.name;
    description ? (product.description = description) : product.description;

    productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
