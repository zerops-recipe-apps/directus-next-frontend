import type { Post, PostSummary } from '@/types';

const DIRECTUS_URL = (process.env.DIRECTUS_URL ?? '').replace(/\/$/, '');
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN ?? '';

function authHeaders(): HeadersInit {
  return DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {};
}

/**
 * Log a descriptive error when a fetch to Directus fails.
 * Inspects the underlying Node.js error code so developers get an
 * actionable message instead of a raw TypeError stack trace.
 */
function logFetchError(fn: string, url: string, err: unknown): void {
  const code = (err as NodeJS.ErrnoException & { cause?: NodeJS.ErrnoException })?.cause?.code
    ?? (err as NodeJS.ErrnoException)?.code;

  if (code === 'ECONNREFUSED') {
    console.error(
      `[directus] ${fn}: connection refused at ${DIRECTUS_URL}\n` +
      `  → The Directus server is not reachable. Check that:\n` +
      `      1. DIRECTUS_URL is set correctly (currently: ${DIRECTUS_URL})\n` +
      `      2. The Directus service is running and accessible from this environment\n` +
      `      3. No firewall or network policy is blocking the connection`,
    );
    return;
  }

  if (code === 'ENOTFOUND') {
    console.error(
      `[directus] ${fn}: DNS lookup failed for ${DIRECTUS_URL}\n` +
      `  → The hostname in DIRECTUS_URL cannot be resolved. Verify the URL is correct.`,
    );
    return;
  }

  if (code === 'ETIMEDOUT' || code === 'ECONNABORTED') {
    console.error(
      `[directus] ${fn}: request to ${url} timed out.\n` +
      `  → The Directus server is reachable but not responding in time.`,
    );
    return;
  }

  console.error(`[directus] ${fn} failed:`, err);
}

/**
 * Build the asset URL for a Directus file UUID.
 * Appends access_token as a query param so that browser-loaded resources
 * (Next.js Image, <img>, og:image) can access protected Directus assets
 * without needing custom Authorization headers.
 */
export function getAssetUrl(
  id: string | null | undefined,
  params?: Record<string, string>,
): string {
  if (!id || !DIRECTUS_URL) return '';
  const searchParams = new URLSearchParams(params);
  if (DIRECTUS_TOKEN) searchParams.set('access_token', DIRECTUS_TOKEN);
  return `${DIRECTUS_URL}/assets/${id}?${searchParams.toString()}`;
}

/**
 * Format an ISO date string into a human-readable date.
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

const POST_SUMMARY_FIELDS = [
  'id',
  'title',
  'slug',
  'excerpt',
  'status',
  'cover_image',
  'tags',
  'date_published',
  'category_id.name',
  'category_id.slug',
  'author_id.name',
  'author_id.avatar',
].join(',');

const POST_FULL_FIELDS = POST_SUMMARY_FIELDS + ',content,author_id.bio';

interface GetPostsOptions {
  categorySlug?: string;
  page?: number;
  perPage?: number;
}

export interface PostsResult {
  posts: PostSummary[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export async function getPosts(options: GetPostsOptions = {}): Promise<PostsResult> {
  const { categorySlug, page = 1, perPage = 9 } = options;
  const empty: PostsResult = { posts: [], total: 0, page, perPage, totalPages: 0 };

  if (!DIRECTUS_URL) {
    console.warn('[directus] DIRECTUS_URL is not set — returning empty posts list.');
    return empty;
  }

  try {
    const url = new URL(`${DIRECTUS_URL}/items/posts`);
    url.searchParams.set('fields', POST_SUMMARY_FIELDS);
    url.searchParams.set('filter[status][_eq]', 'published');
    url.searchParams.set('sort', '-date_published');
    url.searchParams.set('meta', 'total_count,filter_count');
    url.searchParams.set('limit', String(perPage));
    url.searchParams.set('offset', String((page - 1) * perPage));
    if (categorySlug) {
      url.searchParams.set('filter[category_id][slug][_eq]', categorySlug);
    }

    const res = await fetch(url.toString(), {
      headers: authHeaders(),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`[directus] getPosts: ${res.status} ${res.statusText}`);
      return empty;
    }

    const json = (await res.json()) as { data: PostSummary[]; meta: { filter_count: number } };
    const total = json.meta?.filter_count ?? 0;
    return {
      posts: Array.isArray(json.data) ? json.data : [],
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    };
  } catch (err) {
    logFetchError('getPosts', `${DIRECTUS_URL}/items/posts`, err);
    return empty;
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!DIRECTUS_URL) return null;

  try {
    const url = new URL(`${DIRECTUS_URL}/items/posts`);
    url.searchParams.set('fields', POST_FULL_FIELDS);
    url.searchParams.set('filter[slug][_eq]', slug);
    url.searchParams.set('filter[status][_eq]', 'published');
    url.searchParams.set('limit', '1');

    const res = await fetch(url.toString(), {
      headers: authHeaders(),
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const { data } = (await res.json()) as { data: Post[] };
    return data?.[0] ?? null;
  } catch (err) {
    logFetchError('getPost', `${DIRECTUS_URL}/items/posts`, err);
    return null;
  }
}

export async function getPostSlugs(): Promise<string[]> {
  if (!DIRECTUS_URL) return [];

  try {
    const url = new URL(`${DIRECTUS_URL}/items/posts`);
    url.searchParams.set('fields', 'slug');
    url.searchParams.set('filter[status][_eq]', 'published');

    const res = await fetch(url.toString(), {
      headers: authHeaders(),
      cache: 'no-store',
    });

    if (!res.ok) return [];

    const { data } = (await res.json()) as { data: { slug: string }[] };
    return Array.isArray(data) ? data.map((p) => p.slug) : [];
  } catch (err) {
    logFetchError('getPostSlugs', `${DIRECTUS_URL}/items/posts`, err);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export async function getCategories(): Promise<Category[]> {
  if (!DIRECTUS_URL) return [];

  try {
    const url = new URL(`${DIRECTUS_URL}/items/categories`);
    url.searchParams.set('fields', 'id,name,slug');
    url.searchParams.set('sort', 'name');

    const res = await fetch(url.toString(), {
      headers: authHeaders(),
      cache: 'no-store',
    });

    if (!res.ok) return [];

    const { data } = (await res.json()) as { data: Category[] };
    return Array.isArray(data) ? data : [];
  } catch (err) {
    logFetchError('getCategories', `${DIRECTUS_URL}/items/categories`, err);
    return [];
  }
}
