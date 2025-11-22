import { useVideosStore } from '../store/videosStore';

export function SearchBar() {
  const setSearch = useVideosStore((state) => state.setSearch);
  const searchTerm = useVideosStore((state) => state.searchTerm);

  return (
    <input
      type="text"
      placeholder="Search videos..."
      value={searchTerm}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-1 max-w-md px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-teal-200 dark:border-slate-700 focus:border-teal-500 focus:outline-none transition-colors"
    />
  );
}