import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import User from "./User";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn()
  id: string;

  @Exclude()
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
