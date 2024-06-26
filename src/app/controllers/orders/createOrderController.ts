import { CreateOrderUseCase } from "src/app/useCases/orders/createOrderUseCase";

export class CreateOrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  async handleRequest(request: any, response: any) {
    const { id: orderId, clientId, items: orderItems } = request.body;

    this.createOrderUseCase.execute({
      orderId,
      clientId,
      orderItems,
    });
  }
}
