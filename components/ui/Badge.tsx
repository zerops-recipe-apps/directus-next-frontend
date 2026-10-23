interface BadgeProps {
  children: React.ReactNode;
  variant?: 'category' | 'tag';
}

export function Badge({ children, variant = 'category' }: BadgeProps) {
  if (variant === 'tag') {
    return (
      <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-200">
        #{children}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
      {children}
    </span>
  );
}
