import Link from 'next/link';
import { BookOpen, ArrowRight, Code2, Layers, GitBranch, Zap } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Layers,
    title: 'Architecture overview',
    body: 'Understand how Directus, PostgreSQL, Valkey, and S3 connect inside a private Zerops network.',
  },
  {
    icon: Code2,
    title: 'zerops.yaml pipeline',
    body: 'Build, deploy, and readiness-check config explained line by line — including idempotent initCommands.',
  },
  {
    icon: GitBranch,
    title: 'Schema management',
    body: 'Declarative snapshot.yaml workflow: export from Data Studio, commit, deploy — guarded apply on Zerops.',
  },
  {
    icon: Zap,
    title: 'Auto-healing seed hook',
    body: 'A server.start extension that fills empty tables on every boot and self-heals deleted demo data.',
  },
];

export function GuideSection() {
  return (
    <section className="border-b border-zinc-200 bg-white/40 px-6 py-16 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <BookOpen className="h-3.5 w-3.5" />
              Implementation Guide
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              How this was built
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
              A step-by-step guide covering every decision — from service provisioning to the auto-healing seed hook.
            </p>
          </div>
          <a
            href="https://github.com/zeropsio/recipes/tree/main/directus-next"
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
          >
            Recipe docs
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Highlight cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
            <Link
              key={title}
              href="/implementation"
              className="group flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md hover:shadow-blue-100/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 ring-4 ring-blue-50 transition-transform duration-200 group-hover:scale-110">
                <Icon className="h-5 w-5 text-blue-600" strokeWidth={1.75} />
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-zinc-900 group-hover:text-blue-700 transition-colors">
                  {title}
                </p>
                <p className="text-xs leading-relaxed text-zinc-500">{body}</p>
              </div>
              <div className="mt-auto flex items-center gap-1 text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                Read more <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
