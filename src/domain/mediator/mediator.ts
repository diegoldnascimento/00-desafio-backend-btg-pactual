import { DomainEvent } from "../events/domainEvent";
import { Handler } from "../handlers/handler";

export interface Mediator {
  register<T>(eventType: string, handler: Handler): void;
  publish<T>(event: DomainEvent): Promise<void>;
}
