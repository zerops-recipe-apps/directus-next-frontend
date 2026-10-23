interface EmptyPostsProps {
  isConfigured: boolean;
}

export function EmptyPosts({ isConfigured }: EmptyPostsProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 py-24 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100">
        <svg className="h-8 w-8 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
        </svg>
      </div>
      <p className="text-base font-semibold text-zinc-500">No posts found</p>
      <p className="mt-1.5 max-w-xs text-sm text-zinc-400">
        {isConfigured ? 'No published posts in your Directus instance yet.' : 'Connect a Directus instance to see posts here.'}
      </p>
    </div>
  );
}
