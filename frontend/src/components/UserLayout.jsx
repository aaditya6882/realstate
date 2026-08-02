export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      <main className="max-w-7xl mx-auto px-6 pt-8">
        {children}
      </main>
    </div>
  );
}
