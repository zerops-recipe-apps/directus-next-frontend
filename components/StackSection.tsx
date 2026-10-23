import {
  Layers,
  Globe,
  Database,
  Zap,
  Cloud,
  Server,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StackItem {
  name: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

const STACK: StackItem[] = [
  {
    name: 'Directus',
    description: 'Headless CMS & REST API',
    icon: Layers,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50 ring-purple-100',
  },
  {
    name: 'Next.js',
    description: 'React framework',
    icon: Globe,
    iconColor: 'text-zinc-800',
    iconBg: 'bg-zinc-100 ring-zinc-200',
  },
  {
    name: 'PostgreSQL',
    description: 'Primary database (HA)',
    icon: Database,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50 ring-blue-100',
  },
  {
    name: 'Valkey',
    description: 'Cache & pub/sub sync',
    icon: Zap,
    iconColor: 'text-red-600',
    iconBg: 'bg-red-50 ring-red-100',
  },
  {
    name: 'S3 Storage',
    description: 'Object storage',
    icon: Cloud,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50 ring-amber-100',
  },
  {
    name: 'Node.js',
    description: 'Runtime',
    icon: Server,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50 ring-green-100',
  },
];

export function StackSection() {
  return (
    <section className="border-b border-zinc-200 bg-white/50 px-6 py-14 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Powered by</p>
          <p className="mt-2 text-sm text-zinc-500">Built on battle-tested open-source infrastructure</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {STACK.map(({ name, description, icon: Icon, iconColor, iconBg }) => (
            <div
              key={name}
              className="group flex flex-col items-center gap-3.5 rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/60"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ring-4 ${iconBg} shadow-sm transition-transform duration-200 group-hover:scale-110`}
              >
                <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">{name}</p>
                <p className="mt-0.5 text-xs leading-tight text-zinc-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
