interface PostType {
  id: number;
  name: string;
  slug: string;
  color: string;
}

interface PostTypeOption {
  value: string;
  label: string;
}

type PostTypeOptions = PostTypeOption[];

export type { PostType, PostTypeOption, PostTypeOptions };
