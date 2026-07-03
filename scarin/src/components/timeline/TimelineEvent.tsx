"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";

interface Props {
  event: any;
  index: number;
}

export function TimelineEvent({ event, index }: Props) {
  const isEven = index % 2 === 0;
  const isAnniversary = event.date?.toLowerCase().includes("27 de febrero");

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col md:flex-row items-center w-full mb-16 relative ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full md:w-1/2 flex justify-center p-4 relative">
        {isAnniversary && (
          <div className="absolute inset-0 bg-pink-300/20 blur-3xl rounded-full z-0 pointer-events-none transform scale-150 animate-pulse"></div>
        )}
        {event.imageUrl ? (
          <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl z-10 transition-all duration-500 ${
            isAnniversary 
              ? "ring-4 ring-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.5)] scale-105" 
              : "ring-4 ring-white/50"
          }`}>
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
        ) : (
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-purple-100 flex items-center justify-center shadow-inner z-10">
            <span className="text-purple-400">Foto aquí</span>
          </div>
        )}
      </div>

      <div className={`w-full md:w-1/2 p-6 flex flex-col ${isEven ? "md:items-end md:text-right" : "md:items-start md:text-left"} items-center text-center z-10`}>
        <span className={`font-bold text-lg mb-4 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md flex items-center gap-2 ${
          isAnniversary 
            ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-pink-500/40 animate-bounce" 
            : "text-purple-600 bg-white/60"
        }`}>
          {isAnniversary && <Heart size={18} className="fill-white" />}
          {event.date}
          {isAnniversary && <Heart size={18} className="fill-white" />}
        </span>
        <p className={`font-medium text-lg max-w-md backdrop-blur-sm p-5 rounded-2xl shadow-sm border ${
          isAnniversary
            ? "text-pink-950 bg-pink-50/80 border-pink-200 shadow-pink-200/50"
            : "text-purple-950 bg-white/60 border-purple-100"
        }`}>
          {event.description}
        </p>
      </div>
    </motion.div>
  );
}
