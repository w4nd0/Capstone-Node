import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import Order from "./Order";
import Product from "./Product";

@Entity("order_products")
class OrderProduct {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: string;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @ManyToOne(() => Order)
  order: Order;

  @Exclude()
  @Column()
  productId: string;
  
  @Exclude()
  @Column()
  orderId: string;

  @Exclude()
  @Column()
  price: number;

  @Column()
  quantity: number;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;
  
  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

export default OrderProduct;
