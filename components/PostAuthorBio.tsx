import Image from 'next/image';

interface PostAuthorBioProps {
  name: string;
  bio: string;
  avatarUrl: string;
}

export function PostAuthorBio({ name, bio, avatarUrl }: PostAuthorBioProps) {
  const initial = name[0]?.toUpperCase() ?? '?';

  return (
    <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">About the author</p>
      <div className="flex items-start gap-4">
        {avatarUrl ? (
          <Image src={avatarUrl} alt={name} width={48} height={48} className="shrink-0 rounded-full object-cover ring-2 ring-zinc-200 ring-offset-1 ring-offset-zinc-50" />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-base font-semibold text-blue-700">{initial}</div>
        )}
        <div>
          <p className="mb-1.5 text-sm font-semibold text-zinc-900">{name}</p>
          <p className="text-sm leading-relaxed text-zinc-500">{bio}</p>
        </div>
      </div>
    </div>
  );
}
