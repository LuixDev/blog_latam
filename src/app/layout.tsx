import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Blog LATAM",
  description: "Las mejores noticias y actualidad de Latinoamérica.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased selection:bg-emerald-500/10 text-slate-900`}>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50/50 via-white to-white"></div>
        <div className="fixed inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.5))] opacity-20"></div>
        
        <Header />

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="border-t border-black/5 bg-slate-50/50 py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Blog LATAM. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
