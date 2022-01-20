import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

import Order from "../../entities/Order";
import OrderProduct from "../../entities/OrderProduct";

interface IOrder {
  userId: string;
  city: string;
  street: string;
  number: number;
  products_ids: string[];
}

interface IRequest {
  order: IOrder;
  products_ids: string[];
}
class CreateOrderService {
  async execute(request: IRequest): Promise<Order | Error> {
    try {
      const { order, products_ids } = request;
      const orderRepository = getRepository(Order);
      const orderProductsRepository = getRepository(OrderProduct);

      const newOrder = orderRepository.create({
        ...order,
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
