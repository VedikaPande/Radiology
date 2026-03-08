/**
 * Shared Kafka configuration for all microservices.
 * Each service imports the broker list and topic definitions from here.
 */

// ─── Broker Configuration ──────────────────────────────────
export const KAFKA_BROKERS = [
  "localhost:9094", // kafka-broker-1
  "localhost:9095", // kafka-broker-2
  "localhost:9096", // kafka-broker-3
];

// ─── Topic Definitions ─────────────────────────────────────
// All Kafka topics used across services are defined here to
// maintain a single source of truth.
export const TOPICS = {
  USER_EVENTS: "user-events",          // auth-service publishes user lifecycle events
  CASE_EVENTS: "case-events",          // case-service (future)
  IMAGE_EVENTS: "image-events",        // image-analysis-service (future)
  ANALYTICS_EVENTS: "analytics-events", // analytics-service (future)
  NOTIFICATION_EVENTS: "notification-events", // notification-service (future)
} as const;

// ─── Event Type Definitions ────────────────────────────────
export const USER_EVENT_TYPES = {
  USER_REGISTERED: "USER_REGISTERED",
  USER_LOGGED_IN: "USER_LOGGED_IN",
  USER_LOGGED_OUT: "USER_LOGGED_OUT",
  USER_PROFILE_UPDATED: "USER_PROFILE_UPDATED",
} as const;

export type TopicName = (typeof TOPICS)[keyof typeof TOPICS];
export type UserEventType = (typeof USER_EVENT_TYPES)[keyof typeof USER_EVENT_TYPES];
