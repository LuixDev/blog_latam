import { NextResponse } from "next/server";
import { runAgentCore } from "@/lib/agent-core";

export async function POST(request: Request) {
  try {
    // 1. Validar la clave secreta
    const authHeader = request.headers.get("authorization");
    const secretKey = process.env.AGENT_SECRET_KEY;

    if (!authHeader || authHeader.trim() !== `Bearer ${secretKey?.trim()}`) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 2. Ejecutar el agente directamente (Serverless compatible)
    const post = await runAgentCore();

    return NextResponse.json({ 
      message: "Agente ejecutado con éxito", 
      post: post.title 
    });
  } catch (error: any) {
    console.error("Agent Route Error:", error);
    return NextResponse.json({ 
      error: "Fallo al ejecutar el agente", 
      details: error.message 
    }, { status: 500 });
  }
}
