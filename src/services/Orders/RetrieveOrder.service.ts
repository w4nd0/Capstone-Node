import Order from "../../entities/Order";
import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

class RetrieveOrderService {
  async execute(id: string): Promise<Order | Error> {
    const ordersRepository = getRepository(Order);

    const order = await ordersRepository
      .findOneOrFail({ id })
      .catch((error: any) => {
        throw new AppError("Order not found", 404);
      });

    return order;
  }
}
export default RetrieveOrderService;
