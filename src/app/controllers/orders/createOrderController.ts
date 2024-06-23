import { CreateOrderUseCase } from "src/app/useCases/orders/createOrderUseCase";

export class CreateOrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase
  ) {}
  async handleRequest(request, response) {
    const { id: orderId, clientId, items: orderItems } = request.body;

    await this.createOrderUseCase.execute({
      orderId,
      clientId,
      orderItems
    })
  }
}
