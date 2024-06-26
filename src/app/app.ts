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

(async () => {
  await bootstrap();

  const dummyHandleResponse = {};

  const mediator = new Mediator();

  const createOrderUseCase = new CreateOrderUseCase(mediator);

  const createOrderHandler = new CreateOrderHandler(rabbitMQService);

  // Register handlers with mediator
  mediator.register("CreateOrderEvent", createOrderHandler);
  mediator.register("CreatedOrderEvent", function () {
    console.log(
      "After the order Created Order Event is sent, then persist somewhere...",
    );
  });

  new CreateOrderController(createOrderUseCase).handleRequest(
    dummyHandleRequest,
    dummyHandleResponse,
  );


})();
