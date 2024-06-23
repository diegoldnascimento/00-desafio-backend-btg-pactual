import { Order } from "./order";

interface SutOptions {
  orderId: string;
  customerId: string;
  orderItems: { product: string; price: number; quantity: number }[];
}

const makeSut = ({ orderId, customerId, orderItems }: SutOptions) => {
  const order = Order.create(orderId, customerId, orderItems);
  return { order };
};
describe("Order", () => {
  describe("create", () => {
    it("should create a valid order when the correct value is provided", () => {
      const validCustomerId = "123";
      const validOrderId = "1001";
      const validOrderItems = [
        {
          product: "new Product",
          quantity: 1,
          price: 100,
        },
      ];

      const { order } = makeSut({
        orderId: validOrderId,
        customerId: validCustomerId,
        orderItems: validOrderItems,
      });

      expect(order.id).toBeDefined();
      expect(order.orderId).toBe(validOrderId); // Check orderId
      expect(order.customerId).toBe(validCustomerId);
      expect(order.orderItems).toEqual(validOrderItems);
      expect(order.status).toBe("created");
      expect(order.subtotal).toBe(100);
    });

    it("should throw an error when providing an invalid Customer ID", () => {
      const invalidCustomerId = null as never;
      const validOrderItems = [
        {
          product: "new Product",
          quantity: 1,
          price: 100,
        },
      ];

      expect(() =>
        makeSut({
          orderId: "1001",
          customerId: invalidCustomerId,
          orderItems: validOrderItems,
        }),
      ).toThrow(new Error("Customer ID must have a valid value"));
    });

    it("should throw an error when order items are empty", () => {
      const validCustomerId = "123";
      const emptyOrderItems = [] as never;

      expect(() =>
        makeSut({
          orderId: "1001",
          customerId: validCustomerId,
          orderItems: emptyOrderItems,
        }),
      ).toThrow(new Error("Order Items cannot be empty"));
    });

    it("should throw an error when order item has an invalid price", () => {
      const validCustomerId = "123";
      const invalidOrderItems = [
        {
          product: "new Product",
          quantity: 1,
          price: -100, // invalid price
        },
      ];

      expect(() =>
        makeSut({
          orderId: "1001",
          customerId: validCustomerId,
          orderItems: invalidOrderItems,
        }),
      ).toThrow(new Error("Item price must be a valid number"));
    });

    it("should throw an error when order item has an invalid quantity", () => {
      const validCustomerId = "123";
      const invalidOrderItems = [
        {
          product: "new Product",
          quantity: 0, // invalid quantity
          price: 100,
        },
      ];

      expect(() =>
        makeSut({
          orderId: "1001",
          customerId: validCustomerId,
          orderItems: invalidOrderItems,
        }),
      ).toThrow(new Error("Item quantity must be a valid number"));
    });

    it("should calculate subtotal correctly for multiple items", () => {
      const validCustomerId = "123";
      const multipleOrderItems = [
        {
          product: "Product 1",
          quantity: 2,
          price: 50,
        },
        {
          product: "Product 2",
          quantity: 1,
          price: 100,
        },
      ];

      const { order } = makeSut({
        orderId: "1001",
        customerId: validCustomerId,
        orderItems: multipleOrderItems,
      });

      expect(order.subtotal).toBe(200);
    });
  });

  describe("changeStatus", () => {
    it("should change order status correctly", () => {
      const validCustomerId = "123";
      const validOrderItems = [
        {
          product: "new Product",
          quantity: 1,
          price: 100,
        },
      ];

      const { order } = makeSut({
        orderId: "1001",
        customerId: validCustomerId,
        orderItems: validOrderItems,
      });

      order.changeStatus("cancelled");
      expect(order.status).toBe("cancelled");

      order.changeStatus("refunded");
      expect(order.status).toBe("refunded");
    });
  });
});
