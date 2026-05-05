import cron from "node-cron";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

console.log("⏰ Programador de publicaciones iniciado...");
console.log("📅 El agente publicará automáticamente 2 artículos al día (a las 00:00 y 12:00).");

// Programar tarea 2 veces al día (00:00 y 12:00)
cron.schedule("0 0,12 * * *", async () => {
  console.log("🤖 Ejecutando agente autónomo programado...");
  try {
    const { stdout } = await execAsync("npm run agent");
    console.log("✅ Publicación automática completada:", stdout);
  } catch (error) {
    console.error("❌ Fallo en la publicación automática:", error);
  }
});

// Mantener el proceso vivo
process.stdin.resume();
