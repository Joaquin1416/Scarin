"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function LoveMessage() {
  return (
    <section className="py-24 px-4 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 md:left-32 text-pink-300/40 animate-pulse">
        <Heart size={64} fill="currentColor" />
      </div>
      <div className="absolute bottom-10 right-10 md:right-32 text-purple-300/40 animate-pulse" style={{ animationDelay: "1s" }}>
        <Heart size={48} fill="currentColor" />
      </div>
      <div className="absolute top-1/2 right-1/4 text-rose-300/30 animate-pulse" style={{ animationDelay: "2s" }}>
        <Heart size={32} fill="currentColor" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="bg-white/70 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-2xl border border-white/60 text-center relative">
          
          {/* Top Heart Icon */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-400 to-purple-500 p-3 rounded-full shadow-lg">
            <Heart size={32} className="text-white fill-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-8 font-serif italic">
            Para Ti...
          </h2>
          
          <p className="text-xl md:text-2xl text-purple-950/80 leading-relaxed font-medium">
            Durante todo este tiempo que he estado contigo me he sentido tan feliz y tan contento y te quiero agradecer por eso y siempre lo estaré, te amo demasiado, te has convertido en la persona mas importante de mi vida, eres lo mejor, eres muy buena hija, muy buena compañera y estudiante pero mas importante, eres excelente persona. 
            <br/><br/>
            Estoy muy orgulloso de ti y de la persona que eres, te admiro y siempre te admiraré, espero que podamos estar juntos de aqui hasta viejitos, te amo muchismo.
          </p>
          
          <div className="mt-10 flex justify-center gap-2 text-pink-400">
            <Heart size={20} fill="currentColor" />
            <Heart size={20} fill="currentColor" />
            <Heart size={20} fill="currentColor" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
