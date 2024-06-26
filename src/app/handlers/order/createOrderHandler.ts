import { CreateOrderUseCase } from "src/app/useCases/orders/createOrderUseCase";
import { Handler } from "src/domain/handlers/handler";


const rmqQueue = process?.env.RABBIT_MQ_ORDER_V1_QUEUE_CREATED || "";

export class CreateOrderHandler implements Handler {
  constructor(private readonly queueService: MessagingQueueService) {}

  async handle(event: any): Promise<void> {
    await this.queueService.produce(rmqQueue, event);
  }
}
