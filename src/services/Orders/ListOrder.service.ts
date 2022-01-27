import Order from "../../entities/Order";
import { getRepository } from "typeorm";
import User from "../../entities/User";

interface Request {
  userId: string;
}

class ListOrdersService {
  async execute({ userId }: Request): Promise<Order[] | Error> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ id: userId });

    const ordersRepository = getRepository(Order);
    let orders: Promise<Order[]>;

    if (user && user.isAdm) {
      orders = ordersRepository.find();  
    } else {
      orders = ordersRepository.find({
        where: {
          userId,
        }
      }); 
    };

    return orders;
  }
}

export default ListOrdersService;
