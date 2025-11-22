import { useEffect } from 'react';
import { Header } from './components/Header';
import { AddVideoForm } from './components/AddVideoForm';
import { LibraryGrid } from './components/LibraryGrid';
import { WatchNextQueue } from './components/WatchNextQueue';
import { useVideosStore } from './store/videosStore';

function App() {
  const { videos } = useVideosStore();

  useEffect(() => {}, [videos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 dark:from-slate-900 dark:to-teal-900 transition-colors duration-300">
      <Header />
      <main className="container mx-auto p-4 flex-1 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <AddVideoForm />
          <LibraryGrid />
        </div>
        <aside className="w-full lg:w-80 lg:flex-shrink-0">
          <WatchNextQueue />
        </aside>
      </main>
    </div>
  );
}

export default App;