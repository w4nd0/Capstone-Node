import Order from "../../entities/Order";
import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

interface IOrder {
  id: string;
  status: string;
}

class UpdateOrderService {
  async execute({ id, status }: IOrder): Promise<Order | Error> {
    const ordersRepository = getRepository(Order);

    const order = await ordersRepository.findOne({ id });
    if (!order) {
      throw new AppError("Not found any Order with this id");
    }

    status ? (order.status = status) : order.status;

    ordersRepository.save(order);

    return order;
  }
}

export default UpdateOrderService;
