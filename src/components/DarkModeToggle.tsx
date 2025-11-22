import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Sync React state with the actual <html class="dark">
  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    check(); // initial check

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    document.documentElement.classList.toggle('dark');
    const nowDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('dark', String(nowDark));
  };

  return (
    <button
      onClick={toggle}
      className="p-3 rounded-full bg-teal-500/10 hover:bg-teal-500/30 dark:bg-teal-400/10 dark:hover:bg-teal-400/30 transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-400" />
      ) : (
        <Moon className="w-6 h-6 text-teal-600" />
      )}
    </button>
  );
}