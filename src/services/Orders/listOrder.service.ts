import Order from "../../entities/Order";
import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

class ListOrdersService {
  async execute(): Promise<Order[] | Error> {
    try {
      const ordersRepository = getRepository(Order);

      const orders = ordersRepository.find();

      return orders;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }
}

export default ListOrdersService;
