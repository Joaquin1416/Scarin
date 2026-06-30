export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
