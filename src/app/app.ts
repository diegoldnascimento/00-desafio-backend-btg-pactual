import { RabbitMQConnectionAdapter } from "src/infra/queue/rabbitmq/rabbitMqConnectionAdapter";
import { CreateOrderController } from "./controllers/orders/createOrderController";
import { CreateOrderUseCase } from "./useCases/orders/createOrderUseCase";

console.log("Oi! app.ts");

const dummyHandleRequest = {
  body: {
    id: 1001,
    clientId: 1,
    items: [
      {
        product: "lapis",
        quantity: 100,
        price: 1.1,
      },
      {
        product: "caderno",
        quantity: 10,
        price: 1.1,
      },
    ],
  },
};

const dummyHandleResponse = {};

new CreateOrderController(
  new CreateOrderUseCase()
).handleRequest(
  dummyHandleRequest,
  dummyHandleResponse,
);
