import { Order } from "src/domain/entities/order";
import { RabbitMQConnectionAdapter } from "src/infra/messaging/rabbitmq/rabbitMqConnectionAdapter";

export class CreateOrderV1Consumer {
  private readonly queueName: string;

  constructor(private readonly mqConnection: RabbitMQConnectionAdapter) {
    this.queueName = process.env.RABBIT_MQ_ORDER_V1_QUEUE_CREATED || '';
  }

  async startConsuming(): Promise<void> {
    try {
      await this.mqConnection.connect();
      console.log(`[*] Waiting for messages in ${this.queueName}. To exit, press CTRL+C`);

      this.mqConnection.consume(this.queueName, this.handleMessage.bind(this));
    } catch (error) {
      console.error('Error starting RabbitMQ consumer:', error);
    }
  }

  async stopConsuming(): Promise<void> {
    try {
      // Optionally implement if needed
      // For simplicity, assume RabbitMQ connection is managed externally
    } catch (error) {
      console.error('Error stopping RabbitMQ consumer:', error);
    }
  }

  async handleMessage(messageContent: string | null): Promise<void> {
    try {
      if (messageContent) {
        const message = JSON.parse(messageContent);
        console.log(`[x] Received message: ${messageContent}`);
        console.log({message})
        const { CodigoPedido, codigoCliente, items } = message

        const order = Order.create(
          CodigoPedido,
          codigoCliente,
          items
        )

        console.log({order})
        // Persist and save in memory





        // Process the message (e.g., save to database, perform business logic)
        // Example: await someService.processMessage(message);

        // Acknowledge the message to RabbitMQ (assuming handled successfully)
      } else {
        console.error('[x] Received empty message');
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  }
}

