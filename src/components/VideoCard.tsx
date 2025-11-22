import { useVideosStore } from '../store/videosStore';
import { formatDuration } from '../lib/videoUtils';   
import type { Video } from '../types';

interface VideoWithQueued extends Video {
  queued?: boolean;
}

interface VideoCardProps {
  video: VideoWithQueued;
}

export function VideoCard({ video }: VideoCardProps) {
  const deleteVideo = useVideosStore((state) => state.deleteVideo);
  const addToQueue = useVideosStore((state) => state.addToQueue);
  const removeFromQueue = useVideosStore((state) => state.removeFromQueue);

  const handleQueueToggle = () => {
    video.queued ? removeFromQueue(video.id) : addToQueue(video.id);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-teal-200/50 dark:border-teal-800/50 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="aspect-video overflow-hidden bg-slate-200 dark:bg-slate-700">
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>

      <div className="p-5 space-y-4">
        <div className="flex-1 min-h-[4.5rem] flex flex-col justify-between">
          <h3 className="font-semibold text-lg line-clamp-2 leading-tight text-slate-900 dark:text-slate-100">
            {video.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {video.channel} · {formatDuration(video.duration)}
          </p>
        </div>

        <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
          Chapters: {video.chapters?.length ?? 0}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleQueueToggle}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              video.queued
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-teal-100 text-teal-700 hover:bg-teal-200 dark:bg-teal-900/50 dark:text-teal-300 dark:hover:bg-teal-900'
            }`}
          >
            {video.queued ? 'Queued' : 'Queue'}
          </button>
          <button
            onClick={() => deleteVideo(video.id)}
            className="px-4 py-2 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}