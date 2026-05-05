"use client";

import { useState } from "react";
import Link from "next/link";
import SubscribeButton from "./SubscribeButton";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group z-50">
          <img src="/favicon.svg" alt="Logo" className="h-10 w-10 transition-transform group-hover:scale-110" />
          <span className="text-xl md:text-2xl font-bold tracking-tight font-outfit text-gradient">Blog LATAM</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          <Link href="/" className="transition-colors hover:text-emerald-600">Inicio</Link>
          <Link href="/noticias" className="transition-colors hover:text-emerald-600">Noticias</Link>
        </nav>
        
        {/* Right Section (Subscribe + Mobile Menu Toggle) */}
        <div className="flex items-center gap-3 z-50">
          <SubscribeButton />
          
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-emerald-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-black/5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col items-center gap-6 py-8 text-lg font-bold text-slate-600">
            <Link 
              href="/" 
              className="transition-colors hover:text-emerald-600 w-full text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/noticias" 
              className="transition-colors hover:text-emerald-600 w-full text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Noticias
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
