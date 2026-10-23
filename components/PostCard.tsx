import Image from 'next/image';
import Link from 'next/link';
import { getAssetUrl, formatDate } from '@/lib/directus';
import { Badge } from '@/components/ui/Badge';
import { PostCoverImage } from '@/components/PostCoverImage';
import type { PostSummary } from '@/types';

interface PostCardProps {
  post: PostSummary;
}

export function PostCard({ post }: PostCardProps) {
  const coverUrl = getAssetUrl(post.cover_image, { width: '800', format: 'webp', quality: '80' });
  const avatarUrl = getAssetUrl(post.author_id?.avatar, { width: '64', format: 'webp' });
  const initial = post.author_id?.name?.[0]?.toUpperCase() ?? '?';

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/60"
    >
      <PostCoverImage src={coverUrl} alt={post.title} variant="card" />
      <div className="flex flex-1 flex-col p-5">
        {post.category_id && (
          <div className="mb-3"><Badge variant="category">{post.category_id.name}</Badge></div>
        )}
        <h2 className="mb-2 text-base font-semibold leading-snug text-zinc-900 transition-colors line-clamp-2 group-hover:text-blue-700">{post.title}</h2>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500 line-clamp-3">{post.excerpt}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => <Badge key={tag} variant="tag">{tag}</Badge>)}
          </div>
        )}
        <div className="flex items-center gap-2.5 border-t border-zinc-100 pt-4">
          {avatarUrl ? (
            <Image src={avatarUrl} alt={post.author_id?.name ?? ''} width={28} height={28} className="rounded-full object-cover ring-1 ring-zinc-200" />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">{initial}</div>
          )}
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-xs font-medium text-zinc-700">{post.author_id?.name ?? 'Unknown'}</span>
            {post.date_published && <span className="text-xs text-zinc-400">{formatDate(post.date_published)}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
