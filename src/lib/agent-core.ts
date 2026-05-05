import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";

// Temas variados sobre LATAM
const TOPICS = [
  { topic: "El auge del emprendimiento tecnológico en México y su impacto regional", category: "Tecnología" },
  { topic: "Cómo Brasil se está convirtiendo en el hub de fintech más grande de América Latina", category: "Economía" },
  { topic: "La crisis climática en la Amazonía y las soluciones locales que están emergiendo", category: "Medio Ambiente" },
  { topic: "El renacimiento de la gastronomía latinoamericana en la escena culinaria mundial", category: "Cultura" },
  { topic: "Energías renovables en Chile: el modelo que el mundo debería seguir", category: "Medio Ambiente" },
  { topic: "Salud pública en Colombia: avances y desafíos tras la pandemia", category: "Salud" },
  { topic: "Inteligencia artificial aplicada a la agricultura en Argentina y Uruguay", category: "Tecnología" },
  { topic: "El turismo sostenible en Costa Rica: lecciones para toda la región", category: "Turismo" },
  { topic: "Blockchain y criptomonedas: adopción masiva en Venezuela y El Salvador", category: "Economía" },
  { topic: "La industria cinematográfica latinoamericana y su momento en plataformas globales", category: "Cultura" },
];

const IMAGES_BY_CATEGORY: Record<string, string> = {
  "Tecnología": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  "Economía": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
  "Medio Ambiente": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
  "Cultura": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
  "Deportes": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
  "Salud": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
  "Turismo": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800",
};

export async function runAgentCore() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  console.log("🚀 Ejecutando Agent Core...");

  const chosen = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  
  const prompt = `
    Eres un periodista experto de una revista de élite en Latinoamérica. 
    Escribe un artículo de blog elegante, profesional y minimalista sobre: "${chosen.topic}".
    
    CRÍTICO: No uses símbolos # para subtítulos. Usa texto en negrita (ej: **Título de Sección**) para dar un estilo más limpio y editorial.
    
    Requisitos:
    - Título sofisticado.
    - Introducción profunda.
    - 3 secciones con subtítulos en NEGRITA (sin #).
    - Conclusión elegante.
    - Mínimo 500 palabras.
    - Formato JSON: title, summary, content, category, read_time.
    - category: "${chosen.category}".
    - read_time: "X min lectura".
    - Idioma: Español.
  `;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" },
  });

  const postData = JSON.parse(completion.choices[0].message.content || "{}");
  const id = Date.now().toString();

  const image = IMAGES_BY_CATEGORY[chosen.category] ||
    `https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800`;

  const finalData = {
    id,
    ...postData,
    date: new Date().toISOString(),
    author: "Reporter",
    image,
  };

  // Limpieza de seguridad para asegurar que no haya símbolos # en el contenido
  const sanitizedContent = finalData.content.replace(/^#+\s*(.*)$/gm, '**$1**').replace(/#+/g, '');

  const { error } = await supabase.from("posts").insert([{
      ...finalData,
      content: sanitizedContent,
      read_time: finalData.read_time
    }]);
  if (error) throw error;

  return finalData;
}
