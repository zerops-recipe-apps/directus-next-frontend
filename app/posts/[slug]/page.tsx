import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPost, getPostSlugs, getAssetUrl, formatDate } from '@/lib/directus';
import { Badge } from '@/components/ui/Badge';
import { BackLink } from '@/components/ui/BackLink';
import { PostCoverImage } from '@/components/PostCoverImage';
import { PostAuthor } from '@/components/PostAuthor';
import { PostAuthorBio } from '@/components/PostAuthorBio';
import { PostTags } from '@/components/PostTags';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.cover_image
        ? [{ url: getAssetUrl(post.cover_image, { width: '1200', format: 'webp' }) }]
        : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const coverUrl = getAssetUrl(post.cover_image, { width: '1200', format: 'webp', quality: '85' });
  const avatarUrl = getAssetUrl(post.author_id?.avatar, { width: '80', format: 'webp' });

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <BackLink href="/blog" label="All posts" />
      </div>

      {post.category_id && (
        <div className="mb-4">
          <Badge variant="category">{post.category_id.name}</Badge>
        </div>
      )}

      <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-4xl">
        {post.title}
      </h1>

      <div className="mb-8">
        <PostAuthor
          name={post.author_id?.name}
          avatarUrl={avatarUrl}
          date={post.date_published ? formatDate(post.date_published) : null}
        />
      </div>

      <PostCoverImage src={coverUrl} alt={post.title} variant="detail" />

      <div className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-10">
          <PostTags tags={post.tags} />
        </div>
      )}

      {post.author_id?.bio && (
        <PostAuthorBio
          name={post.author_id.name}
          bio={post.author_id.bio}
          avatarUrl={avatarUrl}
        />
      )}

      <div className="mt-12 border-t border-zinc-200 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-500 transition-all hover:border-blue-300 hover:text-zinc-900 hover:shadow-sm"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to all posts
        </Link>
      </div>
    </article>
  );
}
