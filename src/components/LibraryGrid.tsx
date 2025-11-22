import { VideoCard } from './VideoCard';
import { useVideosStore } from '../store/videosStore';

export function LibraryGrid() {
  const { videos, searchTerm, selectedTags } = useVideosStore();

  const filteredVideos = videos.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.channel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 || selectedTags.every((tag) => v.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  if (filteredVideos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">No videos yet. Add one above!</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        Your Library
        <span className="bg-teal-100 dark:bg-teal-900 px-2 py-1 rounded-full text-sm text-teal-600 dark:text-teal-400">
          {filteredVideos.length}
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}