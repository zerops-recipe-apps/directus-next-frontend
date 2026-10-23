export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-400">
            Built with{' '}
            <a href="https://directus.io" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 transition-colors">Directus</a>
            {' '}·{' '}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 transition-colors">Next.js</a>
            {' '}· Deployed on{' '}
            <a href="https://zerops.io" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-600 transition-colors">Zerops</a>
          </p>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <a href="https://github.com/zerops-recipe-apps/directus-next-frontend" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 transition-colors">Source</a>
            <a href="https://app.zerops.io/recipes/directus-next" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 transition-colors">Deploy</a>
            <a href="https://docs.zerops.io" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 transition-colors">Docs</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
