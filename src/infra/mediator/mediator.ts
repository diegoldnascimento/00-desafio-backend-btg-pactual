export interface Mediator {
  publish<T>(event: T): Promise<void>;
}

export class MediatorImpl implements Mediator {
  private handlers = new Map<string, any>();

  register<T>(eventType: string, handler: any): void {
    this.handlers.set(eventType, handler);
  }

  async publish<T>(event: any): Promise<void> {
    const handler = this.handlers.get(event.name);
    if (handler) {
      await handler.handle(event);
    }
  }
}
