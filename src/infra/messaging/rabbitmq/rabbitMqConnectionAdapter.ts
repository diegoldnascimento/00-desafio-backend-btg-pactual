import client, { Channel, Connection, ConsumeMessage } from "amqplib";

const rmqUser = process.env.RABBIT_MQ_USERNAME || "";
const rmqPass = process.env.RABBIT_MQ_PASSWORD;
const rmqHost = process.env.RABBIT_MQ_HOSTNAME;
const rmqQueue = process.env.RABBIT_MQ_ORDER_V1_QUEUE_CREATED || "";

export class RabbitMQConnectionAdapter implements MessagingQueueService {
  connection!: Connection;
  channel!: Channel;
  private connected!: Boolean;

  async connect() {
    if (this.connected && this.channel) {
      return;
    }

    this.connected = true;

    try {
      console.log(`⌛️ Connecting to Rabbit-MQ Server`);
      this.connection = await client.connect(
        `amqp://${rmqUser}:${rmqPass}@${rmqHost}:5672`,
      );

      console.log(`✅ Rabbit MQ Connection is ready`);

      this.channel = await this.connection.createChannel();

      console.log(`🛸 Created RabbitMQ Channel successfully`);
    } catch (error) {
      console.error(error);
      console.error(`Not connected to MQ Server`);
    }
  }

  async produce(queue: string, message: any) {
    try {
      if (!this.channel) {
        await this.connect();
      }

      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async consume(queue: string, handleIncomingNotification: any) {
    await this.channel.assertQueue(queue, {
      durable: true,
    });

    this.channel.consume(
      queue,
      (msg) => {
        {
          if (!msg) {
            return console.error(`Invalid incoming message`);
          }
          handleIncomingNotification(msg?.content?.toString());
          this.channel.ack(msg);
        }
      },
      {
        noAck: false,
      },
    );
  }
}
const mqConnection = new RabbitMQConnectionAdapter();

export default mqConnection;
