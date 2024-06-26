import { DomainEvent } from "../domainEvent";

export class CreateOrderEvent implements DomainEvent {
  eventName: string = "CreateOrderEvent";

  constructor(
    readonly orderId: string,
    readonly clientId: string,
    readonly orderItems: [],
    readonly createdAt: Date,
  ) {}
}
