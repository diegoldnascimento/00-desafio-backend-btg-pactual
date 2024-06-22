import crypto from "crypto";

interface OrderItem {
  product: string;
  price: number;
  quantity: number;
}

interface IOrder {
  id: string;
  customerId: string;
  subtotal: number;
  orderItems: OrderItem[];
  status: "created" | "cancelled" | "refunded";
  createdAt: Date;
  updatedAt: Date;
}

export class Order implements IOrder {
  readonly id: string;
  readonly customerId: string;
  readonly subtotal: number;
  readonly orderItems: OrderItem[];
  readonly createdAt: Date;
  updatedAt: Date;
  status;

  constructor(
    id: string,
    customerId: string,
    subtotal: number,
    items: OrderItem[],
    status: "created" | "cancelled" | "refunded",
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.customerId = customerId;
    this.subtotal = subtotal;
    this.orderItems = items;
    this.status = status;
    this.createdAt = new Date(createdAt.toISOString());
    this.updatedAt = new Date(updatedAt.toISOString());
  }

  static create(customerId: string, orderItems: OrderItem[]): Order {
    if (!customerId) {
      throw new Error("Customer ID must have a valid value");
    }

    if (orderItems.length === 0) {
      throw new Error("Order Items cannot be empty");
    }

    orderItems.forEach((item) => {
      if (item.price <= 0) {
        throw new Error("Item price must be a valid number");
      }

      if (item.quantity <= 0) {
        throw new Error("Item quantity must be a valid number");
      }
    });

    const orderId = crypto.randomUUID();
    const subtotal = orderItems.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );
    const orderStatus = "created";
    const currentDate = new Date().toISOString();

    return new Order(
      orderId,
      customerId,
      subtotal,
      orderItems,
      orderStatus,
      new Date(currentDate),
      new Date(currentDate),
    );
  }

  changeStatus(newStatus: "created" | "cancelled" | "refunded") {
    this.status = newStatus;
    this.updatedAt = new Date();
  }
}
