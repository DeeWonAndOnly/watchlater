import { useVideosStore } from '../store/videosStore';

export function TagFilter() {
  const { videos, selectedTags, toggleTag } = useVideosStore();
  const allTags = [...new Set(videos.flatMap((v) => v.tags))];

  return (
    <div className="flex flex-wrap gap-2">
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            selectedTags.includes(tag)
              ? 'bg-teal-500 text-white shadow-md'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-teal-100 dark:hover:bg-teal-800'
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}