import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface Slug {
  title: string;
  slug: string;
  category: {
    title: string;
    description: string;
    slug: string;
  };
  subCategory?:
    | {
        title: string;
        description: string;
        slug: string;
      }
    | undefined;
  position: number;
  lastUpdated: string;
}

export interface SubItem {
  name: string;
  slug: string;
  position: number;
  lastUpdated: string;
}
export interface Item {
  name: string;
  description?: string | undefined;
  slug: string;
  items?: SubItem[] | undefined;
  position: number;
  lastUpdated?: string | undefined;
}

export interface OrderedSlugs {
  name: string;
  description: string;
  slug: string;
  items: Item[];
  position: number;
}

export interface DocMetadata {
  slug: string;
  title: string;
  lastUpdated: string;
  next?:
    | {
        slug: string;
        title: string;
        location: string[];
      }
    | undefined;
  prev?:
    | {
        slug: string;
        title: string;
        location: string[];
      }
    | undefined;
  path: string;
}

export interface ReturnedDoc {
  source: MDXRemoteSerializeResult;
  meta: DocMetadata;
}
