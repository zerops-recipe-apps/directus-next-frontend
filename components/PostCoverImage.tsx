import Image from 'next/image';

interface PostCoverImageProps {
  src: string;
  alt: string;
  variant: 'card' | 'detail';
  priority?: boolean;
}

function ImagePlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-50 to-zinc-100">
      <svg className="h-10 w-10 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
      <span className="text-xs font-medium text-zinc-300">No image</span>
    </div>
  );
}

export function PostCoverImage({ src, alt, variant, priority = false }: PostCoverImageProps) {
  if (variant === 'card') {
    return (
      <div className="relative aspect-[2/1] w-full overflow-hidden bg-zinc-100">
        {src ? (
          <>
            <Image src={src} alt={alt} fill priority={priority} className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/5 to-transparent" />
          </>
        ) : (
          <ImagePlaceholder />
        )}
      </div>
    );
  }

  return (
    <div className="relative mb-10 aspect-[2/1] w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-lg shadow-zinc-200/80">
      {src ? (
        <Image src={src} alt={alt} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 896px" />
      ) : (
        <ImagePlaceholder />
      )}
    </div>
  );
}
