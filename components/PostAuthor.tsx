import Image from 'next/image';

interface PostAuthorProps {
  name: string | null | undefined;
  avatarUrl: string;
  date: string | null | undefined;
}

export function PostAuthor({ name, avatarUrl, date }: PostAuthorProps) {
  const initial = name?.[0]?.toUpperCase() ?? '?';

  return (
    <div className="flex items-center gap-3 border-b border-zinc-200 pb-8">
      {avatarUrl ? (
        <Image src={avatarUrl} alt={name ?? ''} width={40} height={40} className="rounded-full object-cover ring-2 ring-zinc-200 ring-offset-1 ring-offset-white" />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">{initial}</div>
      )}
      <div>
        <p className="text-sm font-semibold text-zinc-900">{name ?? 'Unknown'}</p>
        {date && <p className="text-xs text-zinc-400">{date}</p>}
      </div>
    </div>
  );
}
