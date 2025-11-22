import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Video, Timestamp } from '../types';

interface VideosState {
  videos: Video[];
  queue: string[];
  searchTerm: string;
  selectedTags: string[];
  addVideo: (videoData: Omit<Video, 'id'>) => void;
  updateVideo: (id: string, updates: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
  addToQueue: (id: string) => void;
  removeFromQueue: (id: string) => void;
  toggleQueued: (id: string) => void;
  reorderQueue: (newOrder: string[]) => void;
  setSearch: (term: string) => void;
  toggleTag: (tag: string) => void;
  addCustomTimestamp: (id: string, timestamp: Timestamp) => void;
}

export const useVideosStore = create<VideosState>()(
  persist(
    (set) => ({
      videos: [],
      queue: [],
      searchTerm: '',
      selectedTags: [],

      addVideo: (videoData) =>
        set((state) => ({
          videos: [...state.videos, { ...videoData, id: Date.now().toString() }],
        })),

      updateVideo: (id, updates) =>
        set((state) => ({
          videos: state.videos.map((v) => (v.id === id ? { ...v, ...updates } : v)),
        })),

      deleteVideo: (id) =>
        set((state) => ({
          videos: state.videos.filter((v) => v.id !== id),
          queue: state.queue.filter((q) => q !== id),
        })),

      addToQueue: (id) =>
        set((state) => ({
          queue: [...state.queue, id],
          videos: state.videos.map((v) => (v.id === id ? { ...v, queued: true } : v)),
        })),

      removeFromQueue: (id) =>
        set((state) => ({
          queue: state.queue.filter((q) => q !== id),
          videos: state.videos.map((v) => (v.id === id ? { ...v, queued: false } : v)),
        })),

      toggleQueued: (id) =>
        set((state) => {
          const isQueued = state.queue.includes(id);
          return isQueued
            ? {
                queue: state.queue.filter((q) => q !== id),
                videos: state.videos.map((v) =>
                  v.id === id ? { ...v, queued: false } : v
                ),
              }
            : {
                queue: [...state.queue, id],
                videos: state.videos.map((v) =>
                  v.id === id ? { ...v, queued: true } : v
                ),
              };
        }),

      reorderQueue: (newOrder) => set({ queue: newOrder }),

      setSearch: (term) => set({ searchTerm: term }),

      toggleTag: (tag) =>
        set((state) => ({
          selectedTags: state.selectedTags.includes(tag)
            ? state.selectedTags.filter((t) => t !== tag)
            : [...state.selectedTags, tag],
        })),

      addCustomTimestamp: (id, timestamp) =>
        set((state) => ({
          videos: state.videos.map((v) =>
            v.id === id
              ? { ...v, customTimestamps: [...(v.customTimestamps || []), timestamp] }
              : v
          ),
        })),
    }),
    {
      name: 'listenlater-storage',
    }
  )
);