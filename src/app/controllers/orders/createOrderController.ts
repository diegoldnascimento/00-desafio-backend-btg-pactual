import { CreateOrderUseCase } from "src/app/useCases/orders/createOrderUseCase";
import { Mediator } from "src/infra/mediator/mediator";

export class CreateOrderController {
  constructor(private readonly mediator: Mediator) {}
  async handleRequest(request, response) {
    const { id: orderId, clientId, items: orderItems } = request.body;

    this.mediator.publish({
      name: "CreateOrderEvent",
      orderId,
      clientId,
      orderItems,
    });
  }
}
