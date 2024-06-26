import { DomainEvent } from "src/domain/events/domainEvent";
import { Handler } from "src/domain/handlers/handler";
import { Mediator } from "src/domain/mediator/mediator";


export class MediatorImpl implements Mediator {
  private handlers = new Map<string, any>();

  register<T>(eventType: string, handler: Handler): void {
    this.handlers.set(eventType, handler);
  }

  async publish<T>(event: DomainEvent): Promise<void> {
    const handler = this.handlers.get(event.eventName);
    if (handler) {
      console.log(event.eventName, event)
      await handler.handle(event);
    }
  }
}
