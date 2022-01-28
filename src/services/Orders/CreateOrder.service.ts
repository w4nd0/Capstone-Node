import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

import Order from "../../entities/Order";
import OrderProduct from "../../entities/OrderProduct";
import Product from "../../entities/Product";

interface IOrder {
  city: string;
  street: string;
  number: number;
}

interface IRequest {
  userId: string;
  order: IOrder;
  products: IProduct[];
}

interface IProduct {
  id: string;
  quantity: number;
}

class CreateOrderService {
  async execute({ userId, order, products }: IRequest): Promise<Order> {
    const orderRepository = getRepository(Order);
    const orderProductsRepository = getRepository(OrderProduct);

    const newOrder = orderRepository.create({
      user: { id: userId },
      city: order.city,
      street: order.street,
      number: order.number,
    });

    await orderRepository.save(newOrder);

    for (let i = 0; i < products.length; i++) {
      const productRepository = getRepository(Product);
      const product = await productRepository
        .findOneOrFail({
          id: products[i].id,
        })
        .catch(async (e) => {
          await orderRepository.delete({ id: newOrder.id });
          throw new AppError("Product not found", 404);
        });

      const orderProduct = orderProductsRepository.create({
        orderId: newOrder.id,
        productId: products[i].id,
        price: product.price,
      });

      products[i].quantity
        ? (orderProduct.quantity = products[i].quantity)
        : (orderProduct.quantity = 1);

      await orderProductsRepository.save(orderProduct);
    }

    const orderAdded = await orderRepository.findOne({
      id: newOrder.id,
    });

    if (!orderAdded) {
      throw new AppError("Failed to create order.");
    }

    return orderAdded;
  }
}

export default CreateOrderService;
