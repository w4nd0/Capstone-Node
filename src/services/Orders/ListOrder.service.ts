import Order from "../../entities/Order";
import { getRepository } from "typeorm";
import User from "../../entities/User";

interface Request {
  user_id: string;
  params: object;
}

class ListOrdersService {
  async execute({ user_id, params }: Request): Promise<Order[] | Error> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ id: user_id });

    const ordersRepository = getRepository(Order);

    let orders: Promise<Order[]>;

    if (Object.values(params).length && user?.isAdm) {
      orders = ordersRepository.find({ where: { ...params } });
    } else if (user && user.isAdm) {
      orders = ordersRepository.find();
    } else {
      orders = ordersRepository.find({
        where: {
          userId: user_id,
        },
      });
    }

    return orders;
  }
}

export default ListOrdersService;
