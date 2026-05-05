import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetail({ params }: PageProps) {
  const { id } = await params;

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <article className="pb-24">
      {/* Article Header */}
      <header className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <img 
          src={post.image} 
          alt={post.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container relative z-20 mx-auto px-4 mt-auto pb-12">
          <div className="max-w-4xl">
            <span className="px-4 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest mb-6 inline-block shadow-lg shadow-emerald-500/20">
              {post.category}
            </span>
            <h1 className="font-outfit text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 drop-shadow-sm">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-400"></div>
                <span className="font-bold">{post.author}</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-white/40"></span>
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span className="h-1 w-1 rounded-full bg-white/40"></span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 mb-12 rounded-r-2xl">
            <p className="text-xl md:text-2xl text-emerald-900 font-medium italic leading-relaxed">
              {post.summary}
            </p>
          </div>
          
          <div className="prose prose-slate prose-lg max-w-none 
            prose-headings:font-outfit prose-headings:font-bold 
            prose-p:text-slate-600 prose-p:leading-loose
            prose-strong:text-slate-900 prose-strong:text-xl prose-strong:block prose-strong:mt-12 prose-strong:mb-6
          ">
            {/* Convertimos saltos de línea en párrafos y negritas en secciones visuales */}
            {post.content.split('\n').map((paragraph: string, i: number) => {
              if (!paragraph.trim()) return null;
              
              // Si el párrafo es un subtítulo (en negrita)
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h2 key={i} className="text-2xl font-bold text-slate-900 mt-12 mb-6">{paragraph.replace(/\*\*/g, '')}</h2>
              }
              
              return <p key={i} className="mb-6 text-lg text-slate-600 leading-relaxed">{paragraph}</p>;
            })}
          </div>

          <div className="mt-20 pt-10 border-t border-slate-100 flex items-center justify-between">
            <Link href="/noticias" className="text-emerald-600 font-bold hover:gap-3 transition-all flex items-center gap-2">
              ← Volver a noticias
            </Link>
            <div className="flex gap-4">
              {/* Social buttons simulation */}
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-emerald-100 hover:text-emerald-600 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-emerald-100 hover:text-emerald-600 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
