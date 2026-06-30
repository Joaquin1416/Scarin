import fs from 'fs';
import path from 'path';
import exifr from 'exifr';

export async function getTimelinePhotos() {
  const dirPath = path.join(process.cwd(), 'public/images/timeline');
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));
  
  const photos = await Promise.all(files.map(async (file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    let photoDate = stats.mtime;

    try {
      // Intenta leer la fecha original de los metadatos internos (EXIF) de la foto
      const exifData = await exifr.parse(filePath);
      if (exifData && exifData.DateTimeOriginal) {
        photoDate = new Date(exifData.DateTimeOriginal);
      }
    } catch (e) {
      // Si la foto no tiene metadatos EXIF legibles, usará la fecha de modificación (mtime)
    }

    return {
      id: file,
      src: `/images/timeline/${file}`,
      date: photoDate,
      filename: file.replace(/\.[^/.]+$/, "")
    };
  }));

  // Orden alfabético/numérico basado en el nombre del archivo
  return photos.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: 'base' }));
}

export async function getGalleryPhotos() {
  const dirPath = path.join(process.cwd(), 'public/images/gallery');
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));
  
  const photos = await Promise.all(files.map(async (file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    let photoDate = stats.mtime;

    try {
      const exifData = await exifr.parse(filePath);
      if (exifData && exifData.DateTimeOriginal) {
        photoDate = new Date(exifData.DateTimeOriginal);
      }
    } catch (e) {
      // Fallback a mtime
    }

    return {
      id: file,
      src: `/images/gallery/${file}`,
      date: photoDate,
      filename: file.replace(/\.[^/.]+$/, "")
    };
  }));

  // Orden alfabético/numérico basado en el nombre del archivo
  return photos.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: 'base' }));
}
