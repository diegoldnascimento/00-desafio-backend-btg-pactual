import { CreateOrderUseCase } from "src/app/useCases/orders/createOrderUseCase";

export class CreateOrderHandler {
  constructor(private readonly queueService: MessagingQueueService) {}

  async handle(event: any): Promise<void> {
    await this.queueService.produce("queue", event);
  }
}
