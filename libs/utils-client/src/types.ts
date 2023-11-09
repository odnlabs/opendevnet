/**
 * Represents the return value of a call to serialize().
 */
export type MDXRemoteSerializeResult<
  TScope = Record<string, unknown>,
  TFrontmatter = Record<string, unknown>,
> = {
  /**
   * The compiledSource, generated from next-mdx-remote/serialize.
   */
  compiledSource: string;
  /**
   * An arbitrary object of data which will be supplied to the MDX.
   *
   * For example, in cases where you want to provide template variables to the MDX, like `my name is {name}`,
   * you could provide scope as `{ name: "Some name" }`.
   */
  scope: TScope;
  /**
   * If parseFrontmatter was set to true, contains any parsed frontmatter found in the MDX source.
   */
  frontmatter: TFrontmatter;
};

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
  source: string;
  meta: DocMetadata;
}
