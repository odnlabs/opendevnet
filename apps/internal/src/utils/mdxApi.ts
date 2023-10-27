import fs from 'fs/promises';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

type RequiredFrontmatter = [string, 'string' | 'number' | 'boolean'][];

const verifyFrontmatter = (
  path: string,
  data: Record<string, unknown>,
  requiredFrontmatter: RequiredFrontmatter
): void => {
  for (const requiredProperty of requiredFrontmatter) {
    if (!data[requiredProperty[0]]) {
      throw new Error(
        `No ${requiredProperty[0]} found in ${path}. Please add a ${requiredProperty[0]} to the frontmatter`
      );
    }

    if (
      requiredProperty[1] === 'string' &&
      typeof data[requiredProperty[0]] !== 'string'
    ) {
      throw new Error(
        `${requiredProperty[0]} was found in ${path}, but was not of type "string"`
      );
    }

    if (
      requiredProperty[1] === 'number' &&
      typeof data[requiredProperty[0]] !== 'number'
    ) {
      throw new Error(
        `${requiredProperty[0]} was found in ${path}, but was not of type "number"`
      );
    }

    if (
      requiredProperty[1] === 'boolean' &&
      typeof data[requiredProperty[0]] !== 'boolean'
    ) {
      throw new Error(
        `${requiredProperty[0]} was found in ${path}, but was not of type "boolean"`
      );
    }
  }
};

interface Slug {
  title: string;
  slug: string;
  category: string;
  subCategory?: string;
}

/**
 * Get all slugs from a directory.
 * @param mdxDir A directory containing mdx files.
 * @returns An array of slugs.
 */
export const getSlugs = async (mdxDir: string): Promise<Slug[]> => {
  // Recieve directory and get all mdx files in the directory
  const docsPath = path.join(process.cwd(), mdxDir);
  const paths: string[] = [];
  const catDirs = await fs.readdir(docsPath, { withFileTypes: true });

  // Filter out directories that don't exist
  for (const cat of catDirs) {
    if (!cat.isDirectory()) continue;

    const categorySlugs = sync(
      `${mdxDir}/${cat.name}/*.mdx`.replaceAll('\\', '/')
    );

    for (const slugPath of categorySlugs) paths.push(slugPath);

    const subCatDirs = await fs.readdir(`${docsPath}/${cat.name}`, {
      withFileTypes: true,
    });

    for (const subCat of subCatDirs) {
      if (!subCat.isDirectory()) continue;

      const subCategorySlugs = sync(
        `${mdxDir}/${cat.name}/${subCat.name}/*.mdx`.replaceAll('\\', '/')
      );
      for (const slugPath of subCategorySlugs) paths.push(slugPath);
    }
  }

  const returnedSlugs: Slug[] = [];

  for (const path of paths) {
    // Get the file slug (name without extension)
    const source = await fs.readFile(path);
    const { data } = matter(source);

    const requiredFrontmatter: RequiredFrontmatter = [['title', 'string']];
    verifyFrontmatter(path, data, requiredFrontmatter);

    const { title } = data as { title: string };

    // Parts
    const parts = path.replaceAll('\\', '/').split('/');
    const fileName = parts[parts.length - 1];
    let fileCategory: string;
    let fileSubCategory: string | undefined;
    if (parts.length === 3) {
      fileCategory = parts[parts.length - 2];
    } else if (parts.length === 4) {
      fileCategory = parts[parts.length - 3];
      fileSubCategory = parts[parts.length - 2];
    } else {
      throw new Error(`Invalid path (part length): ${parts.length}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [slug, _ext] = fileName.split('.');
    returnedSlugs.push({
      title,
      slug,
      category: fileCategory,
      subCategory: fileSubCategory,
    });
  }

  return returnedSlugs;
};

interface SubItem {
  name: string;
  slug: string;
}
export interface Item {
  name?: string;
  slug: string;
  items?: SubItem[];
}

export interface OrderedSlugs {
  name: string;
  slug: string;
  items: Item[];
}

export const getOrderedSlugs = async (
  mdxDir: string
): Promise<OrderedSlugs[]> => {
  const slugs = await getSlugs(mdxDir);

  const ordered: OrderedSlugs[] = [];

  for (const doc of slugs) {
    const catIndex = ordered.findIndex((cat) => cat.slug === doc.category);

    if (catIndex === -1 && doc.subCategory) {
      // If category doesn't exist, add it - for a subcategory doc
      ordered.push({
        name: doc.category
          .split('-')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' '),
        slug: doc.category,
        items: [
          {
            name: doc.subCategory
              .split('-')
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(' '),
            slug: doc.subCategory,
            items: [
              {
                name: doc.title,
                slug: doc.slug,
              },
            ],
          },
        ],
      });
    } else if (catIndex === -1 && !doc.subCategory) {
      // If category doesn't exist, add it - for a category doc
      ordered.push({
        name: doc.category
          .split('-')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' '),
        slug: doc.slug,
        items: [
          {
            name: doc.title,
            slug: doc.slug,
          },
        ],
      });
    } else if (doc.subCategory) {
      // If category exists, add subcategory - for a subcategory doc
      const subCatIndex = ordered[catIndex].items.findIndex(
        (subCat) => subCat.slug === doc.subCategory
      );

      if (subCatIndex === -1) {
        // If subcategory doesn't exist, add it
        ordered.push({
          name: doc.subCategory
            .split('-')
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(' '),
          slug: doc.subCategory,
          items: [
            {
              name: doc.title,
              slug: doc.slug,
            },
          ],
        });
      } else if (ordered[catIndex].items[subCatIndex].items) {
        // If subcategory exists, add doc
        (ordered[catIndex].items[subCatIndex].items as SubItem[]).push({
          name: doc.title,
          slug: doc.slug,
        });
      }
    } else {
      // If category exists, add doc - for a category doc
      ordered[catIndex].items.push({
        name: doc.title,
        slug: doc.slug,
      });
    }
  }

  const preferedOrder = [
    'introduction',
    'contributing',
    'api',
    'web',
    'libraries',
  ];

  return ordered.sort((first, second) => {
    const aIndex = preferedOrder.findIndex((cat) => cat === first.slug);
    const bIndex = preferedOrder.findIndex((cat) => cat === second.slug);
    if (aIndex === -1 && bIndex === -1) {
      return first.name.localeCompare(second.name);
    } else if (aIndex === -1) {
      return 1;
    } else if (bIndex === -1) {
      return -1;
    } else {
      return aIndex - bIndex;
    }
  });
};

export interface DocMetadata {
  slug: string;
  title: string;
}

interface ReturnedDoc {
  source: MDXRemoteSerializeResult;
  meta: DocMetadata;
}

export const getDocFromSlug = async (
  slug: string,
  docsDir: string
): Promise<ReturnedDoc> => {
  // Use receieved directory and slug (url) to get the doc file
  const docsPath = path.join(process.cwd(), docsDir);
  const docPath = path.join(docsPath, `${slug}.mdx`);

  // Extract content and meta data from file
  const source = await fs.readFile(docPath);
  const { content, data } = matter(source);

  if (typeof data.title !== 'string') {
    throw new Error(
      `No title found in ${docPath}. Please add a title to the frontmatter`
    );
  }

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        // rehypeHighlight,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
      remarkPlugins: [remarkGfm],
    },
  });

  // Return all data to display doc
  return {
    source: mdxSource,
    meta: {
      slug,
      title: data.title ?? slug,
    },
  };
};

export const getAllDocs = async (
  docsDir: string,
  results: number
): Promise<DocMetadata[]> => {
  // Sort blogs by dates - from most recent to oldest
  const docs = await Promise.all(
    (await getSlugs(docsDir)).map((slug) => getDocFromSlug(slug.slug, docsDir))
  );
  // Return meta data of last {docsDir} docs - not markdown
  return docs.slice(0, results || 999).map((doc) => doc.meta);
};
