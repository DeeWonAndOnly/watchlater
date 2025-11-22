# WatchLater

**A beautiful, distraction-free video bookmarking web app**  
Save YouTube, Vimeo, and TikTok videos with auto-detected chapters, drag-to-reorder queue, full-text search, tags, and dark mode — all in one clean place.

**Live Demo** → https://watchlater.vercel.app  
**GitHub** → https://github.com/yourusername/watchlater

<!-- Replace the line below with a real screenshot after you push — just drag an image onto this file in GitHub and it auto-uploads -->
![WatchLater screenshot](https://github.com/user-attachments/assets/REPLACE_WITH_REAL_SCREENSHOT_AFTER_PUSH)

### Features
- Paste any YouTube / Vimeo / TikTok link → instantly fetches title, thumbnail, duration, channel, and **YouTube chapters**
- Smooth drag-to-reorder "Watch Next" queue with gorgeous animations
- Full-text search + multi-tag filtering
- Dark mode + fully responsive (looks perfect on mobile)
- Persistent storage across sessions (Zustand + localStorage)
- 100% client-side — no backend, no login, no bloat

### Tech Stack
- React 18 + TypeScript
- Vite (lightning-fast dev server)
- Tailwind CSS
- Zustand (tiny, powerful state management)
- Lucide React icons
- Deployed on Vercel

### Run Locally
```bash
git clone https://github.com/yourusername/watchlater.git
cd watchlater
npm install
npm run dev