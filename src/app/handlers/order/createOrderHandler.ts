import { CreateOrderUseCase } from "src/app/useCases/orders/createOrderUseCase";

export class CreateOrderHandler {
    constructor(private createOrderUseCase: CreateOrderUseCase) {}

    async handle(event: any): Promise<void> {


      await this.createOrderUseCase.execute({
        orderId: event.orderId,
        clientId: event.clientId,
        orderItems: event.orderItems
      })
    }
}
