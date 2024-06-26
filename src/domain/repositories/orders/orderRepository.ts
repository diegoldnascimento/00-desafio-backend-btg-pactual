import { Order } from "src/domain/entities/order";

export interface OrderRepository {
  create(order: Order): Promise<any>;
  findById(orderId: string): Promise<Order | null>;
  update(orderId: string, order: Partial<Order>): Promise<void>;
  delete(orderId: string): Promise<void>;
  findAll(): Promise<Order[]>;
}
