export interface Video {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  description?: string;
  chapters: Chapter[];
  notes?: string;
  tags: string[];
  customTimestamps: Timestamp[];
}

export interface Chapter {
  time: number; // seconds
  title: string;
}

export interface Timestamp {
  time: number;
  label: string;
}