"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  photo: any;
  index: number;
}

export function GalleryImage({ photo, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative aspect-square rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/50 cursor-pointer group"
    >
      <div className="absolute inset-0 bg-purple-200 flex items-center justify-center -z-10">
         <span className="text-purple-400">Cargando...</span>
      </div>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p className="text-white font-medium text-sm drop-shadow-md">{photo.alt}</p>
      </div>
    </motion.div>
  );
}
