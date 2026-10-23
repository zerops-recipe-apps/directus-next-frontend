import { getPosts } from '@/lib/directus';
import { HeroSection } from '@/components/HeroSection';
import { StackSection } from '@/components/StackSection';
import { GuideSection } from '@/components/GuideSection';
import { PostsGrid } from '@/components/PostsGrid';

// Force SSR so DIRECTUS_URL is read at request time from the Zerops secret
// variable, not baked in as empty string during the static build phase.
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { posts } = await getPosts({ perPage: 6 });
  const isConfigured = !!process.env.DIRECTUS_URL;

  return (
    <>
      <HeroSection />
      <StackSection />
      <GuideSection />
      <PostsGrid posts={posts} isConfigured={isConfigured} />
    </>
  );
}
