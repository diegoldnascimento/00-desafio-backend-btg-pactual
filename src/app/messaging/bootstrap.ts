import { RabbitMQConnectionAdapter } from "src/infra/messaging/rabbitmq/rabbitMqConnectionAdapter";
import { CreateOrderV1Consumer } from "./rabbitmq/createOrderConsumer";

export function bootstrap() {
  const mqConnection = new RabbitMQConnectionAdapter();
  const orderConsumer = new CreateOrderV1Consumer(mqConnection);

  orderConsumer.startConsuming();

  // Optionally, you can keep the consumer running in the background
  // For example, in a production environment, you would manage the lifecycle of consumers

  // To stop consuming:
  // await orderConsumer.stopConsuming();
}
