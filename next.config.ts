import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Required for Zerops standalone deployment — bundles runtime + dependencies
  // into .next/standalone so only that directory needs to be deployed.
  output: 'standalone',

  // Images are served directly from Directus / Zerops S3 storage.
  // Disabling optimisation avoids the need to configure remote hostname
  // patterns (which aren't known at build time).
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
