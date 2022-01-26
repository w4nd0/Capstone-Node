import Order from "../../entities/Order";
import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

class DeleteOrderService {
  async execute(id: string) {
    const ordersRepository = getRepository(Order);

    const order = await ordersRepository.findOne({ id });

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    return await ordersRepository.delete(id);
  }
}

export default DeleteOrderService;
