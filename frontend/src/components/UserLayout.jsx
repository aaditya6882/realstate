export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 pb-16">
      <main className="max-w-7xl mx-auto px-6 pt-8">
        {children}
      </main>
    </div>
  );
}
