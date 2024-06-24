import { MediatorImpl as Mediator } from "src/infra/mediator/mediator";
import rabbitMQService from "src/infra/messaging/rabbitmq/rabbitMqConnectionAdapter";
import { CreateOrderController } from "./controllers/orders/createOrderController";
import { CreateOrderHandler } from "./handlers/order/createOrderHandler";
import { bootstrap } from "./messaging/bootstrap";
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

const createOrderUseCase = new CreateOrderUseCase(rabbitMQService);

const mediator = new Mediator();
const createOrderHandler = new CreateOrderHandler(mediator, createOrderUseCase);

// Register handlers with mediator
mediator.register('CreateOrderEvent', createOrderHandler);

new CreateOrderController(mediator).handleRequest(
  dummyHandleRequest,
  dummyHandleResponse,
);

bootstrap();
