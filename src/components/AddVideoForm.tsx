import { useState } from 'react';
import { fetchVideoMetadata } from '../lib/videoUtils';
import { useVideosStore } from '../store/videosStore';
import type { Chapter, Timestamp } from '../types';

export function AddVideoForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState('');
  const [customTs, setCustomTs] = useState(''); // "2:15 My note"
  const addVideo = useVideosStore((state) => state.addVideo);
  const addToQueue = useVideosStore((state) => state.addToQueue);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      const metadata = await fetchVideoMetadata(url);
      setFetched(metadata);
    } catch (error) {
      alert('Oops! Invalid or unsupported URL. Try YouTube/Vimeo/TikTok.');
    }
    setLoading(false);
  };

  const saveVideo = () => {
    if (!fetched) return;
    const tagList = tags.split(',').map((t) => t.trim()).filter(Boolean);
    const tsList = customTs.split('\n').map((line) => {
      const [timeStr, ...label] = line.split(' ');
      if (!timeStr) return null;
      const [m, s] = timeStr.split(':').map(Number);
      return { time: m * 60 + s, label: label.join(' ') } as Timestamp;
    }).filter(Boolean);
    const video = { ...fetched, notes, tags: tagList, customTimestamps: tsList as Timestamp[] };
    const id = Date.now().toString(); // Temp ID
    addVideo(video);
    addToQueue(id); // Auto-add to queue
    setUrl(''); setFetched(null); setNotes(''); setTags(''); setCustomTs('');
    alert('Video bookmarked! ✨');
  };

  if (loading) return <div className="text-center py-4">Fetching video info...</div>;

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-teal-100 dark:border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="Paste YouTube/Vimeo/TikTok link..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-teal-200 focus:border-teal-500 outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-lg hover:from-teal-600 transition-all shadow-md hover:shadow-teal-500/25"
        >
          Fetch & Add
        </button>
      </form>
      {fetched && (
        <div className="mt-4 space-y-4 p-4 bg-teal-50/50 dark:bg-teal-900/50 rounded-lg">
          <img src={fetched.thumbnail} alt={fetched.title} className="w-full h-48 object-cover rounded-lg" />
          <h3 className="font-bold">{fetched.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">By {fetched.channel} • {fetched.duration}</p>
          <ChaptersList chapters={fetched.chapters} />
          <textarea
            placeholder="Add notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded"
            rows={2}
          />
          <input
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Custom timestamps (e.g., 2:15 Cool part)"
            value={customTs}
            onChange={(e) => setCustomTs(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
          <button
            onClick={saveVideo}
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Save to Library
          </button>
        </div>
      )}
    </div>
  );
}

function ChaptersList({ chapters }: { chapters: Chapter[] }) {
  return (
    <div className="space-y-1">
      <h4 className="font-semibold text-teal-600">Auto-Chapters:</h4>
      {chapters.length ? (
        <ul className="text-sm space-y-0.5">
          {chapters.map((ch, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-teal-500 font-mono">{formatTime(ch.time)}</span>
              <span>{ch.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">No timestamps found.</p>
      )}
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}