import { HeroSection } from "@/components/HeroSection";
import { StoryTimeline } from "@/components/timeline/StoryTimeline";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";
import { HiddenMusicPlayer } from "@/components/audio/HiddenMusicPlayer";
import { LoveMessage } from "@/components/LoveMessage";

export default function Home() {
  return (
    <main 
      className="min-h-screen"
      style={{
        backgroundImage: "url('/images/bg-lavender.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundColor: "rgba(250, 245, 255, 0.75)",
        backgroundBlendMode: "overlay"
      }}
    >
      <HeroSection />
      <StoryTimeline />
      <LoveMessage />
      <PhotoGallery />
      <HiddenMusicPlayer />
    </main>
  );
}
