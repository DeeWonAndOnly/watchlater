import { Moon, Sun, ListVideo, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useVideosStore } from '../store/videosStore';

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const setSearch = useVideosStore((s) => s.setSearch);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <header className="border-b border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ListVideo className="w-10 h-10 text-teal-600 dark:text-teal-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            ListenLater
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search videos..."
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-5 py-3 w-72 rounded-2xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
            />
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-full bg-teal-100 dark:bg-teal-900/50 hover:bg-teal-200 dark:hover:bg-teal-900 transition-all"
          >
            {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-slate-700" />}
          </button>
        </div>
      </div>
    </header>
  );
}