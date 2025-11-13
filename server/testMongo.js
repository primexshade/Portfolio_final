import { MongoClient, ServerApiVersion } from "mongodb";

console.log("⚙️ Starting MongoDB connection test...");

const uri = "mongodb+srv://aryan:JuLy2003@cluster0.0fwk4ct.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    console.log("🔄 Trying to connect...");
    await client.connect();
    console.log("✅ Connected! Pinging admin DB...");
    const result = await client.db("admin").command({ ping: 1 });
    console.log("🎉 Ping successful:", result);
  } catch (err) {
    console.error("❌ Error connecting:", err.message);
  } finally {
    await client.close();
    console.log("🔚 Connection closed.");
  }
}

run();