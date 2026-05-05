import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const { error } = await supabase
      .from("subscribers")
      .insert([{ email, created_at: new Date().toISOString() }]);

    if (error) {
      if (error.code === '23505') { // Duplicate key
        return NextResponse.json({ message: "Ya estás suscrito" });
      }
      throw error;
    }

    return NextResponse.json({ message: "Suscripción exitosa" });
  } catch (error: any) {
    console.error("Subscribe Error:", error);
    return NextResponse.json({ error: "Fallo al suscribir" }, { status: 500 });
  }
}
