import Order from "../../entities/Order";
import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";
import User from "../../entities/User";

interface Request {
  id: string;
  userId: string;
}

class RetrieveOrderService {
  async execute({ id, userId }: Request): Promise<Order | Error> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ id: userId });

    const ordersRepository = getRepository(Order);
    
    const order = await ordersRepository
    .findOneOrFail({ id })
    .catch((error: any) => {
      throw new AppError("Order not found", 404);
    });

    if (user && !user.isAdm && userId !== order.userId) {
      throw new AppError("Forbidden.", 403);
    };

    return order;
  }
}
export default RetrieveOrderService;
