import { Db, MongoClient } from "mongodb";

export class MongoDBConnectionAdapter {
  private static instance: MongoDBConnectionAdapter;
  private client!: MongoClient;
  private db!: Db;
  private connected = false;

  constructor() {}

  public static getInstance(): MongoDBConnectionAdapter {
    if (!MongoDBConnectionAdapter.instance) {
      MongoDBConnectionAdapter.instance = new MongoDBConnectionAdapter();
    }
    return MongoDBConnectionAdapter.instance;
  }

  public async connect(uri: string, dbName: string): Promise<void> {
    if (this.connected) {
      return;
    }

    try {
      console.log("⌛ Connecting to MongoDB Server...");
      console.log({uri})
      this.client = new MongoClient(uri);

      await this.client.connect();
      console.log("MongoDB Connected")
      this.db = this.client.db(dbName);
      this.connected = true;
      console.log("✅ MongoDB Connection is ready");
    } catch (error) {
      console.error("❌ MongoDB connection failed", error);
      throw error;
    }
  }

  public getDb(): Db {
    if (!this.connected) {
      throw new Error("Not connected to MongoDB");
    }
    return this.db;
  }

  public async close(): Promise<void> {
    if (this.connected) {
      await this.client.close();
      this.connected = false;
      console.log("🔌 MongoDB connection closed");
    }
  }
}

export default MongoDBConnectionAdapter;


