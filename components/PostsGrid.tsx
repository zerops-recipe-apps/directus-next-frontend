import Link from 'next/link';
import type { PostSummary } from '@/types';
import { PostCard } from '@/components/PostCard';
import { EmptyPosts } from '@/components/EmptyPosts';

interface PostsGridProps {
  posts: PostSummary[];
  isConfigured: boolean;
}

export function PostsGrid({ posts, isConfigured }: PostsGridProps) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-zinc-900">
            Latest Posts
            {posts.length > 0 && (
              <span className="ml-2.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-semibold text-blue-700">{posts.length}</span>
            )}
          </h2>
          <Link href="/blog" className="text-sm font-medium text-zinc-400 transition-colors hover:text-blue-700">View all →</Link>
        </div>
        {!isConfigured && (
          <div className="mb-8 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            <strong>DIRECTUS_URL is not set.</strong> Set it in your{' '}
            <code className="rounded-md bg-amber-100 px-1.5 py-0.5 text-xs font-mono">.env.local</code>{' '}
            file or in the Zerops GUI.
          </div>
        )}
        {posts.length === 0 ? (
          <EmptyPosts isConfigured={isConfigured} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        )}
      </div>
    </section>
  );
}
