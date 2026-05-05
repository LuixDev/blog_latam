"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function SubscribeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulación de envío
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
        setEmail("");
      }, 2000);
    }, 1500);
  };

  const modalContent = isOpen && mounted ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      ></div>
      
      <div className="relative w-full max-w-md scale-100 rounded-3xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {status === "success" ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">¡Te has suscrito!</h3>
            <p className="mt-2 text-slate-600">Recibirás las mejores noticias de LATAM cada día.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Mantente informado</h3>
              <p className="mt-2 text-slate-600">Suscríbete para recibir los mejores artículos y noticias de Latinoamérica directamente en tu email.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Tu correo electrónico</label>
                <input 
                  required
                  type="email" 
                  placeholder="nombre@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button 
                disabled={status === "loading"}
                type="submit"
                className="w-full rounded-xl bg-emerald-600 py-3 font-bold text-white transition-all hover:bg-emerald-700 disabled:opacity-50"
              >
                {status === "loading" ? "Procesando..." : "Suscribirme ahora"}
              </button>
            </form>
            <p className="text-center text-xs text-slate-400">
              Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
            </p>
          </div>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/25"
      >
        Suscribirse
      </button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
