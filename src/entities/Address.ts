import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import User from "./User";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  number: number;
}

export default Address;
