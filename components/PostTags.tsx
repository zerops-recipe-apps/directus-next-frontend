import { Badge } from '@/components/ui/Badge';

interface PostTagsProps {
  tags: string[];
}

export function PostTags({ tags }: PostTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 border-t border-zinc-200 pt-8">
      {tags.map((tag) => <Badge key={tag} variant="tag">{tag}</Badge>)}
    </div>
  );
}
