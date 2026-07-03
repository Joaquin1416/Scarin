import { getGalleryPhotos } from "@/lib/getPhotos";
import { GalleryImage } from "./GalleryImage";
import { galleryDescriptions } from "@/data/galleryData";

export async function PhotoGallery() {
  const photos = await getGalleryPhotos();

  const formattedPhotos = photos.map(photo => {
    const defaultTitle = photo.filename.replace(/[-_]/g, ' ');
    const customData = galleryDescriptions[photo.filename];

    return {
      id: photo.id,
      src: photo.src,
      alt: customData?.title || (defaultTitle.charAt(0).toUpperCase() + defaultTitle.slice(1)) || "Foto juntos"
    };
  });

  return (
    <section className="py-20" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-purple-700 mb-4">Galería</h2>
          <p className="text-purple-900/60 text-lg">Una pequeña colección de fotitos que me encantan</p>
        </div>

        {formattedPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {formattedPhotos.map((photo, index) => (
              <GalleryImage key={photo.id} photo={photo} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center text-purple-800 py-10 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-purple-100">
            <p>Esperando las fotos en <code className="bg-purple-100 text-purple-800 px-2 py-1 rounded">public/images/gallery/</code></p>
          </div>
        )}
      </div>
    </section>
  );
}
