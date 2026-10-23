import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      {/* Gradient orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative">
        {/* Large 404 */}
        <p className="mb-2 bg-gradient-to-b from-zinc-200 to-zinc-400 bg-clip-text text-[8rem] font-black leading-none tracking-tighter text-transparent sm:text-[10rem]">
          404
        </p>

        {/* Floating badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Not Found
          </span>
        </div>

        {/* Divider */}
        <div className="mx-auto mb-6 mt-8 h-px w-24 bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />

        <h1 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900">
          Page doesn&apos;t exist
        </h1>
        <p className="mb-10 max-w-sm text-sm leading-relaxed text-zinc-500">
          This post has been removed, unpublished, or never existed. Head back to the blog to find what you&apos;re looking for.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-700/20 transition-all hover:bg-blue-600 hover:shadow-blue-600/30"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to blog
          </Link>
          <a
            href="https://app.zerops.io/recipe/directus"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
          >
            Deploy on Zerops
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
