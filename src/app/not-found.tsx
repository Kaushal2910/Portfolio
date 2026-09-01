import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-mono text-sm text-amber-400/70 tracking-wider uppercase mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-4 text-white/50 max-w-md mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-400/[0.08] border border-amber-400/30 text-amber-300 text-sm font-medium hover:bg-amber-400/[0.15] hover:border-amber-400/50 transition-all duration-300"
          >
            Back to home
          </Link>
          <Link
            href="/certificates"
            className="px-6 py-3 rounded-lg border border-white/[0.08] text-white/50 text-sm font-medium hover:bg-white/[0.05] hover:border-white/[0.15] hover:text-white/70 transition-all duration-300"
          >
            View certificates
          </Link>
        </div>
      </div>
    </main>
  );
}
