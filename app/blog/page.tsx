import Link from 'next/link';
import type { Metadata } from 'next';
import { getPosts, getCategories } from '@/lib/directus';
import { PostCard } from '@/components/PostCard';
import { EmptyPosts } from '@/components/EmptyPosts';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog — Zerops × Directus',
  description: 'All posts fetched live from Directus CMS deployed on Zerops.',
};

interface Props {
  searchParams: Promise<{ category?: string; page?: string }>;
}

const PER_PAGE = 9;

export default async function BlogPage({ searchParams }: Props) {
  const { category, page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);
  const isConfigured = !!process.env.DIRECTUS_URL;

  const [{ posts, total, totalPages }, categories] = await Promise.all([
    getPosts({ categorySlug: category, page, perPage: PER_PAGE }),
    getCategories(),
  ]);

  return (
    <div className="min-h-[70vh]">
      {/* Page header */}
      <div className="border-b border-zinc-200 bg-white/60 px-6 py-12 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Blog
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                All Posts
                {total > 0 && (
                  <span className="ml-3 rounded-full bg-blue-50 px-3 py-1 align-middle text-base font-semibold text-blue-700">
                    {total}
                  </span>
                )}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                Published live from{' '}
                <a
                  href="https://directus.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 hover:underline"
                >
                  Directus
                </a>{' '}
                on{' '}
                <a
                  href="https://zerops.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 hover:underline"
                >
                  Zerops
                </a>
                .
              </p>
            </div>

            {/* Category filters */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blog"
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    !category
                      ? 'bg-blue-700 text-white shadow-sm shadow-blue-700/20'
                      : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900'
                  }`}
                >
                  All
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/blog?category=${cat.slug}`}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                      category === cat.slug
                        ? 'bg-blue-700 text-white shadow-sm shadow-blue-700/20'
                        : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900'
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {!isConfigured && (
            <div className="mb-8 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
              <strong>DIRECTUS_URL is not set.</strong> Set it in your{' '}
              <code className="rounded-md bg-amber-100 px-1.5 py-0.5 font-mono text-xs">
                .env
              </code>{' '}
              file or in the Zerops GUI.
            </div>
          )}

          {posts.length === 0 ? (
            <EmptyPosts isConfigured={isConfigured} />
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-12 flex items-center justify-center gap-2">
                  {page > 1 && (
                    <Link
                      href={`/blog?${new URLSearchParams({ ...(category ? { category } : {}), page: String(page - 1) })}`}
                      className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                      </svg>
                      Previous
                    </Link>
                  )}

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={`/blog?${new URLSearchParams({ ...(category ? { category } : {}), page: String(p) })}`}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                          p === page
                            ? 'bg-blue-700 text-white shadow-sm shadow-blue-700/20'
                            : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                        }`}
                      >
                        {p}
                      </Link>
                    ))}
                  </div>

                  {page < totalPages && (
                    <Link
                      href={`/blog?${new URLSearchParams({ ...(category ? { category } : {}), page: String(page + 1) })}`}
                      className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
                    >
                      Next
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  )}
                </nav>
              )}

              {/* Results info */}
              <p className="mt-4 text-center text-xs text-zinc-400">
                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, total)} of {total} post{total !== 1 ? 's' : ''}
                {category && ` in "${categories.find((c) => c.slug === category)?.name ?? category}"`}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
