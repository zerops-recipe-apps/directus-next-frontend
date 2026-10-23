import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

// Self-hosted Inter avoids a network call to Google Fonts at build time,
// which can fail inside Zerops build containers.
const inter = localFont({
  src: '../public/fonts/inter-variable.woff2',
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Zerops × Directus Blog', template: '%s | Zerops × Directus' },
  description: 'A live Next.js blog powered by a Directus CMS instance deployed on Zerops — PostgreSQL, Valkey, S3, and zero-downtime deploys.',
  openGraph: { type: 'website', siteName: 'Zerops × Directus Blog' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex min-h-screen flex-col text-zinc-900 antialiased">
        {/* Subtle page-wide blue gradient — same aesthetic as the implementation guide */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-blue-50/50 via-white to-white" />
        <div className="pointer-events-none fixed -top-64 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-200/20 blur-3xl" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
