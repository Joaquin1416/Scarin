"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  event: any;
  index: number;
}

export function TimelineEvent({ event, index }: Props) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col md:flex-row items-center w-full mb-12 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full md:w-1/2 flex justify-center p-4">
        {event.imageUrl ? (
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/50">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-purple-100 flex items-center justify-center shadow-inner">
            <span className="text-purple-400">Foto aquí</span>
          </div>
        )}
      </div>

      <div className={`w-full md:w-1/2 p-6 flex flex-col ${isEven ? "md:items-end md:text-right" : "md:items-start md:text-left"} items-center text-center`}>
        <span className="text-purple-600 font-bold text-lg mb-2 bg-white/60 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">{event.date}</span>
        <h3 className="text-2xl font-bold text-purple-950 mb-3">{event.title}</h3>
        <p className="text-purple-900/70 max-w-md bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-purple-50">{event.description}</p>
      </div>
    </motion.div>
  );
}
