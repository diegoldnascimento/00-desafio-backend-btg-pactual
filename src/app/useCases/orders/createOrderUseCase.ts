import {
    CreateOrderInputDto,
    CreateOrderOutputDto,
} from "src/app/dtos/useCases/orders/createOrderDto";
import { CreateOrderEvent } from "src/domain/events/order/CreateOrderEvent";
import { Mediator } from "src/domain/mediator/mediator";

export class CreateOrderUseCase {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  async execute(input: CreateOrderInputDto): Promise<CreateOrderOutputDto> {
    const { orderId, clientId, orderItems } = input;

    this.mediator.publish(
      new CreateOrderEvent(orderId, clientId, orderItems, new Date())
    );
  }
}
