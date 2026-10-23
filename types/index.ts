export interface Category {
  name: string;
  slug: string;
}

export interface Author {
  name: string;
  bio?: string;
  avatar: string | null;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'published' | 'draft';
  cover_image: string | null;
  tags: string[] | null;
  date_published: string | null;
  category_id: Category | null;
  author_id: Author | null;
}

export type PostSummary = Omit<Post, 'content'>;
