import {
    CreateOrderInputDto,
    CreateOrderOutputDto,
} from "src/app/dtos/useCases/orders/createOrderDto";

const rmqQueue = process.env.RABBIT_MQ_ORDER_V1_QUEUE_CREATED || "";

export class CreateOrderUseCase {
  constructor(private readonly queueService: MessagingQueueService) {}

  async execute(input: CreateOrderInputDto): Promise<CreateOrderOutputDto> {
    const { orderId, clientId, orderItems } = input;

    const orderPayload = {
      CodigoPedido: orderId,
      codigoCliente: clientId,
      items: orderItems,
    };

    await this.queueService.produce(rmqQueue, orderPayload);
  }
}
