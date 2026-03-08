import { Kafka, Producer, logLevel } from "kafkajs";
import { config } from "../config";

let producer: Producer | null = null;
let connected = false;

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokers,
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 3000,
    retries: 5,
  },
});

export async function connectKafkaProducer(): Promise<void> {
  try {
    producer = kafka.producer();
    await producer.connect();
    connected = true;
    console.log("✅ Kafka producer connected");
  } catch (error) {
    console.warn("⚠️  Kafka producer connection failed (events will be skipped):", (error as Error).message);
    connected = false;
  }
}

export async function publishEvent(topic: string, event: Record<string, unknown>): Promise<void> {
  if (!producer || !connected) {
    console.warn(`⚠️  Kafka not connected — skipping event on topic "${topic}"`);
    return;
  }

  try {
    await producer.send({
      topic,
      messages: [
        {
          key: (event.userId as string) || "system",
          value: JSON.stringify({
            ...event,
            timestamp: new Date().toISOString(),
            source: "auth-service",
          }),
        },
      ],
    });
    console.log(`📤 Event published to "${topic}"`);
  } catch (error) {
    console.error(`Failed to publish event to "${topic}":`, (error as Error).message);
  }
}

export async function disconnectKafkaProducer(): Promise<void> {
  if (producer && connected) {
    await producer.disconnect();
    console.log("Kafka producer disconnected");
  }
}
