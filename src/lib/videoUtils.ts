const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
import type { Video, Chapter } from '../types';

export async function fetchVideoMetadata(url: string): Promise<Omit<Video, 'id' | 'notes' | 'tags' | 'customTimestamps' | 'chapters'>> {
  const videoId = extractVideoId(url);
  if (!videoId) throw new Error('Invalid URL');

  let metadata: any = {};

  if (isYouTube(url)) {
    const oembedRes = await fetch(`https://www.youtube.com/oembed?url=${url}&format=json`);
    const oembed = await oembedRes.json();
    metadata.title = oembed.title;
    metadata.thumbnail = oembed.thumbnail_url;
    metadata.channel = oembed.author_name;

    if (YOUTUBE_API_KEY) {
      const apiRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`);
      const apiData = await apiRes.json();
      if (apiData.items.length > 0) {
        const item = apiData.items[0];
        metadata.duration = parseDuration(item.contentDetails.duration);
        metadata.description = item.snippet.description;
      }
    }
  } else if (isVimeo(url)) {
    const vimeoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
    const res = await fetch(`https://vimeo.com/api/oembed.json?url=${url}`);
    const data = await res.json();
    metadata.title = data.title;
    metadata.thumbnail = data.thumbnail_url;
    metadata.duration = formatSeconds(data.duration);
    metadata.channel = data.author_name;
    const descRes = await fetch(`https://vimeo.com/api/v2/video/${vimeoId}.json`);
    const descData = await descRes.json();
    metadata.description = descData[0]?.description;
  } else if (isTikTok(url)) {
    const res = await fetch(`https://www.tiktok.com/oembed?url=${url}`);
    const data = await res.json();
    metadata.title = data.title;
    metadata.thumbnail = data.thumbnail_width ? data.thumbnail_url : '';
    metadata.duration = 'Short clip';
    metadata.channel = data.author_name;
  } else {
    throw new Error('Unsupported platform');
  }

  metadata.chapters = metadata.description ? parseChapters(metadata.description) : [];
  return metadata;
}

function extractVideoId(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  const vi = url.match(/vimeo\.com\/(\d+)/);
  const tt = url.match(/tiktok\.com\/@[^\/]+\/video\/(\d+)/);
  return yt?.[1] || vi?.[1] || tt?.[1] || null;
}

function isYouTube(url: string): boolean { return /youtube|youtu\.be/.test(url); }
function isVimeo(url: string): boolean { return /vimeo/.test(url); }
function isTikTok(url: string): boolean { return /tiktok/.test(url); }

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 'Unknown';
  const h = parseInt(match[1] || '0') * 3600;
  const m = parseInt(match[2] || '0') * 60;
  const s = parseInt(match[3] || '0');
  const total = h + m + s;
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function parseChapters(description: string): Chapter[] {
  const regex = /(\d{1,2}:\d{2}(?::\d{2})?)\s+([^ \n\r]+)/gm;
  const chapters: Chapter[] = [];
  let match;
  while ((match = regex.exec(description)) !== null) {
    const timeStr = match[1];
    const title = match[2];
    const [mins, secs, hours = '0'] = timeStr.split(':').map(Number);
    const time = Number(hours) * 3600 + mins * 60 + secs;
    chapters.push({ time, title });
  }
  return chapters;
}

export function formatDuration(duration: number | string): string {
  if (typeof duration === 'string' && duration.includes(':')) return duration;
  const secs = typeof duration === 'number' ? duration : parseInt(duration || '0', 10);
  if (isNaN(secs)) return '0:00';
  const mins = Math.floor(secs / 60);
  const seconds = secs % 60;
  return `${mins}:${seconds.toString().padStart(2, '0')}`;
}