import { getTimelinePhotos } from "@/lib/getPhotos";
import { TimelineEvent } from "./TimelineEvent";
import { timelineDescriptions } from "@/data/timelineData";

export async function StoryTimeline() {
  const photos = await getTimelinePhotos();

  const events = photos.map((photo) => {
    const defaultTitle = photo.filename.replace(/[-_]/g, ' ') || "Nuestro Recuerdo";
    const customData = timelineDescriptions[photo.filename];

    return {
      id: photo.id,
      date: customData?.dateOverride || new Intl.DateTimeFormat('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }).format(photo.date), 
      title: customData?.title || (defaultTitle.charAt(0).toUpperCase() + defaultTitle.slice(1)),
      description: customData?.description || "Uno de los momentos más bonitos que hemos compartido.",
      imageUrl: photo.src,
    };
  });

  return (
    <section className="py-20 overflow-hidden" id="timeline">
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-purple-300 transform -translate-x-1/2 z-0 opacity-60" />
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl font-extrabold text-purple-700 mb-4">Nuestra Historia</h2>
          <p className="text-purple-900/60 text-lg">Un recorrido por nuestros momentos</p>
        </div>

        <div className="relative z-10">
          {events.length > 0 ? (
            events.map((event, index) => (
              <TimelineEvent key={event.id} event={event} index={index} />
            ))
          ) : (
            <div className="text-center text-purple-800 py-10 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-purple-100">
              <p>Esperando las fotos en <code className="bg-purple-100 text-purple-800 px-2 py-1 rounded">public/images/timeline/</code></p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
