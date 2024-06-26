import { Collection } from "mongodb";
import { Order } from "src/domain/entities/order";
import { OrderRepository } from "src/domain/repositories/orders/orderRepository";
import MongoDBConnectionAdapter from "src/infra/db/mongodb/mongoDbConnectionAdapter";

export class OrdersMongoDBRepository implements OrderRepository {
  private collection: Collection;

  constructor(mongoConnection: MongoDBConnectionAdapter) {
    const db = mongoConnection.getDb();
    this.collection = db.collection('orders');
  }

  async create(order: Order): Promise<any> {
    try {
      return await this.collection.insertOne(order);
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  async findById(orderId: string): Promise<Order | null> {
    try {
      const result = await this.collection.findOne({ orderId });
      if (result) {
        return this.mapDbOrderToOrder(result);
      }
      return null;
    } catch (error) {
      console.error("Error finding order:", error);
      throw error;
    }
  }

  async update(orderId: string, order: Partial<Order>): Promise<void> {
    try {
      await this.collection.updateOne({ orderId }, { $set: order });
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  }

  async delete(orderId: string): Promise<void> {
    try {
      await this.collection.deleteOne({ orderId });
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const result = await this.collection.find({}).toArray();
      return result.map(this.mapDbOrderToOrder);
    } catch (error) {
      console.error("Error finding orders:", error);
      throw error;
    }
  }

  private mapDbOrderToOrder(dbOrder: any): Order {
    return new Order(
      dbOrder.id,
      dbOrder.orderId,
      dbOrder.customerId,
      dbOrder.subtotal,
      dbOrder.orderItems,
      dbOrder.status,
      new Date(dbOrder.createdAt),
      new Date(dbOrder.updatedAt)
    );
  }
}

export default OrdersMongoDBRepository;
