import { RabbitMQConnectionAdapter } from "src/infra/queue/rabbitmq/rabbitMqConnectionAdapter";
const rmqQueue = process.env.RABBIT_MQ_ORDER_V1_QUEUE_CREATED || "";
const mqConnection = new RabbitMQConnectionAdapter();

interface Input {
  orderId: string;
  clientId: string;
  orderItems: [];
}

interface Output {}

export class CreateOrderUseCase {
  constructor() {}
  async execute(input: Input) {
    const { orderId, clientId, orderItems } = input;

    await mqConnection.connect();
    const orderPayload = {
      CodigoPedido: orderId,
      codigoCliente: clientId,
      items: orderItems,
    };
    await mqConnection.produce(rmqQueue, orderPayload);
    console.log("Message successfully created into the queue");
    // mqConnection.consume(rmqQueue, function (message: any) {
    //   console.log("consume", { message });
    //   // Ao consumir, deve salvar no MongoDB
    // });
    //
    mqConnection.consume(rmqQueue, function (message: any) {
      console.log("consume", { message });
      // Ao consumir, deve salvar no MongoDB
    });
  }
}
