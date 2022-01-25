import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

import Order from "../../entities/Order";
import OrderProduct from "../../entities/OrderProduct";

interface IOrder {
  city: string;
  street: string;
  number: number;
}

interface IRequest {
  userId: string;
  order: IOrder;
  products_ids: string[];
}

class CreateOrderService {
  async execute({
    userId,
    order,
    products_ids,
  }: IRequest): Promise<Order | Error> {
    try {
      const orderRepository = getRepository(Order);
      const orderProductsRepository = getRepository(OrderProduct);

      const newOrder = orderRepository.create({
        userId: userId,
        city: order.city,
        street: order.street,
        number: order.number,
      });

      await orderRepository.save(order);

      products_ids.forEach(async (productId) => {
        const orderProduct = orderProductsRepository.create({
          order: {
            id: newOrder.id,
          },
          product: {
            id: productId,
          },
        });

        await orderProductsRepository.save(orderProduct);
      });

      return newOrder;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }
}

export default CreateOrderService;
