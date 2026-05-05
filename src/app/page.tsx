import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidar cada minuto

export default async function Home() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  const allPosts = posts || [];
  const featuredPost = allPosts[0];
  const recentPosts = allPosts.slice(1);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-20">
          <Link href={`/posts/${featuredPost.id}`} className="group grid gap-8 lg:grid-cols-2 items-center">
            <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-slate-100 shadow-2xl shadow-emerald-500/5">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                  Destacado
                </span>
                <span className="text-slate-400 text-sm font-medium">
                  {featuredPost.category} • {featuredPost.readTime}
                </span>
              </div>
              <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight transition-colors group-hover:text-emerald-600">
                {featuredPost.title}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed line-clamp-3">
                {featuredPost.summary}
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500"></div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">{featuredPost.author}</p>
                  <p className="text-slate-500 text-sm">{new Date(featuredPost.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Grid of Posts */}
      <section>
        <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-6">
          <h2 className="font-outfit text-3xl font-bold text-slate-900">Últimas Noticias</h2>
          <Link href="/noticias" className="text-emerald-600 font-bold hover:underline">Ver todas →</Link>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
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
                  {new Date(post.date).toLocaleDateString()} • {post.readTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {allPosts.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            No hay publicaciones en la base de datos todavía.
          </div>
        )}
      </section>
    </div>
  );
}
