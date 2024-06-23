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

    console.log('Message sent into the queue')
    // mqConnection.consume(rmqQueue, function (message: any) {
    //   console.log("consume", { message });
    //   // Ao consumir, deve salvar no MongoDB
    // });
  }
}
