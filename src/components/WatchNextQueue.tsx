import { GripVertical } from 'lucide-react';
import { useVideosStore } from '../store/videosStore';
import type { Video } from '../types';

export function WatchNextQueue() {
  const { videos, queue, reorderQueue } = useVideosStore();

  const queuedVideos = videos
    .filter((v) => queue.includes(v.id))
    .sort((a, b) => queue.indexOf(a.id) - queue.indexOf(b.id));

  if (queuedVideos.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 dark:text-slate-400">
        Queue videos to watch next
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {queuedVideos.map((video, index) => (
        <div
          key={video.id}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('text/plain', video.id);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const draggedId = e.dataTransfer.getData('text/plain');
            if (draggedId !== video.id) {
              const newQueue = queue.filter((id) => id !== draggedId);
              const dropIndex = queue.indexOf(video.id);
              newQueue.splice(dropIndex, 0, draggedId);
              reorderQueue(newQueue);
            }
          }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition flex items-center gap-4 cursor-move"
        >
          <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
            {index + 1}
          </div>
          <img src={video.thumbnail} alt="" className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold line-clamp-2">{video.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">{video.channel}</p>
          </div>
          <GripVertical className="text-slate-400 cursor-grab flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}