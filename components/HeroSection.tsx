import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-blue-50/40 via-white/80 to-white/60 px-6 py-20 sm:py-28">
      {/* Blurred orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-0 h-[450px] w-[450px] rounded-full bg-blue-100/30 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-indigo-100/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Live badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            Live data — no cache, always fresh
          </div>
        </div>

        {/* Logo pair */}
        <div className="mb-8 flex items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-3 shadow-sm">
            <Image
              src="/logos/zerops.webp"
              alt="Zerops"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <span className="text-base font-semibold text-zinc-800">
              Zerops
            </span>
          </div>

          <span className="text-2xl font-light text-zinc-300">×</span>

          <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-3 shadow-sm">
            <Image
              src="/logos/directus.webp"
              alt="Directus"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <span className="text-base font-semibold text-zinc-800">
              Directus
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Deploy. Manage. Scale.
            </span>
            <br />
            <span className="text-zinc-900">Production-ready CMS</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-500">
            A full-stack blog powered by{" "}
            <a
              href="https://directus.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-zinc-800 hover:text-blue-700 transition-colors"
            >
              Directus 11
            </a>{" "}
            on{" "}
            <a
              href="https://zerops.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-zinc-800 hover:text-blue-700 transition-colors"
            >
              Zerops
            </a>{" "}
            — with PostgreSQL 16 HA, Valkey 7 cache, and S3 object storage. Zero
            DevOps overhead.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://app.zerops.io/recipes/directus-next"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-700/20 transition-all hover:bg-blue-600 hover:shadow-blue-600/30"
            >
              Deploy to Zerops
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
            <a
              href="https://github.com/zerops-recipe-apps/directus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View on GitHub
            </a>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 divide-x divide-zinc-200 rounded-2xl border border-zinc-200 bg-white shadow-sm">
            {[
              { label: "Services", value: "5" },
              { label: "Deploy time", value: "~2 min" },
              { label: "Zero config", value: "✓" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-0.5 px-6 py-4"
              >
                <span className="text-xl font-bold text-zinc-900">{value}</span>
                <span className="text-xs text-zinc-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
