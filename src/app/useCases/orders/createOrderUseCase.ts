import {
    CreateOrderInputDto,
    CreateOrderOutputDto,
} from "src/app/dtos/useCases/orders/createOrderDto";
import { Mediator } from "src/infra/mediator/mediator";

export class CreateOrderUseCase {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  async execute(input: CreateOrderInputDto): Promise<CreateOrderOutputDto> {
    const { orderId, clientId, orderItems } = input;

    const orderPayload = {
      CodigoPedido: orderId,
      codigoCliente: clientId,
      items: orderItems,
    };

    this.mediator.publish({
      name: "CreateOrderEvent",
      ...orderPayload,
    });
  }
}
