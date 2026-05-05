import { runAgentCore } from "../src/lib/agent-core";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  try {
    const post = await runAgentCore();
    console.log(`✅ Post publicado con éxito: ${post.title}`);
  } catch (error) {
    console.error("❌ Error ejecutando el agente:", error);
  }
}

run();
