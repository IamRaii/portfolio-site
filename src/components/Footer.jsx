export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-wire py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-stone-600">
          © {year} — All rights reserved.
        </span>
        <span className="font-mono text-xs text-stone-700">
          Built with React + Tailwind CSS
        </span>
        <div className="flex items-center gap-1 font-mono text-xs text-stone-600">
          <span className="text-accent-glow">●</span>
          <span className="ml-1">Available for work</span>
        </div>
      </div>
    </footer>
  );
}
