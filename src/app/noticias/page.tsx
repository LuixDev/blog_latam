import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export default async function NoticiasPage() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  const allPosts = posts || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="font-outfit text-4xl md:text-5xl font-bold text-slate-900 mb-4">Todas las Noticias</h1>
        <p className="text-xl text-slate-600">Explora la actualidad de Latinoamérica a través de nuestra cobertura autónoma.</p>
      </header>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {allPosts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id} className="group flex flex-col gap-5">
            <div className="aspect-video overflow-hidden rounded-2xl bg-slate-100">
              <img 
                src={post.image} 
                alt={post.title} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{post.category}</p>
              <h3 className="font-outfit text-2xl font-bold text-slate-900 leading-snug transition-colors group-hover:text-emerald-600">
                {post.title}
              </h3>
              <p className="text-slate-600 line-clamp-2 leading-relaxed">
                {post.summary}
              </p>
              <p className="text-xs text-slate-400 font-medium mt-2">
                {new Date(post.date).toLocaleDateString()} • {post.read_time}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
      {allPosts.length === 0 && (
        <div className="py-20 text-center text-slate-400">
          No hay artículos publicados todavía.
        </div>
      )}
    </div>
  );
}
