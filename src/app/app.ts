import rabbitMQService from "src/infra/messaging/rabbitmq/rabbitMqConnectionAdapter";
import { CreateOrderController } from "./controllers/orders/createOrderController";
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

new CreateOrderController(createOrderUseCase).handleRequest(
  dummyHandleRequest,
  dummyHandleResponse,
);

bootstrap();

// (async () => {
//   mqConnection.connect();
//
//   mqConnection.consume(rmqQueue, function (message: any) {
//     console.log("consume", { message });
//     // Ao consumir, deve salvar no MongoDB
//   });
// })();
