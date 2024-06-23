import { RabbitMQConnectionAdapter } from "src/infra/messaging/rabbitmq/rabbitMqConnectionAdapter";

const rmqQueue = process.env.RABBIT_MQ_ORDER_V1_QUEUE_CREATED || "";

interface Input {
  orderId: string;
  clientId: string;
  orderItems: [];
}

interface Output {}

export class CreateOrderUseCase {
  constructor(private readonly queueService: MessagingQueueService) {}
  async execute(input: Input) {
    const { orderId, clientId, orderItems } = input;

    const orderPayload = {
      CodigoPedido: orderId,
      codigoCliente: clientId,
      items: orderItems,
    };

    await this.queueService.produce(rmqQueue, orderPayload);

  }
}
