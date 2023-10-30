import fs from 'fs/promises';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const removePos = (slug: string): string => slug.split('-').slice(1).join('-');

const getCorrectSlug = (slug: string): string => {
  const correctSlug = slug.split('-').slice(1).join('-');
  return correctSlug;
};

const getSlugPosition = (slug: string): number => {
  const position = parseInt(slug.split('-')[0], 10);
  if (Number.isNaN(position)) {
    throw new Error(`Invalid slug position: ${slug}`);
  }
  return position;
};

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
  category: {
    title: string;
    slug: string;
  };
  subCategory?: {
    title: string;
    slug: string;
  };
  position: number;
  lastUpdated: string;
}

/**
 * Get all slugs from a directory.
 * @param mdxDir A directory containing mdx files.
 * @returns An array of slugs.
 */
export const getSlugs = async (mdxDir: string): Promise<{ slugs: Slug[] }> => {
  const categoryFrontmatter = new Map<string, { title: string }>();
  const subCategoryFrontmatter = new Map<string, { title: string }>();

  // Recieve directory and get all mdx files in the directory
  const docsPath = path.join(process.cwd(), mdxDir);
  const paths: string[] = [];
  const catDirs = await fs.readdir(docsPath, { withFileTypes: true });

  // Filter out directories that don't exist
  for (const cat of catDirs.reverse()) {
    if (!cat.isDirectory()) continue;

    const categorySlugs = sync(
      `${mdxDir}/${cat.name}/*.mdx`.replaceAll('\\', '/')
    );

    for (const slugPath of categorySlugs) paths.push(slugPath);

    const subCatDirs = await fs.readdir(`${docsPath}/${cat.name}`, {
      withFileTypes: true,
    });

    for (const subCat of subCatDirs.reverse()) {
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
    const { data } = matter(source) as unknown as { data: { title: string } };

    // Parts
    const parts = path.replaceAll('\\', '/').split('/');
    const fileName = parts[parts.length - 1];
    // Skip index.mdx
    if (fileName === 'index.mdx') {
      // Verify frontmatter
      const requiredFrontmatter: RequiredFrontmatter = [['title', 'string']];
      verifyFrontmatter(path, data, requiredFrontmatter);

      if (parts.length === 2 + mdxDir.split('/').length) {
        categoryFrontmatter.set(parts[parts.length - 2], data);
      }
      if (parts.length === 3 + mdxDir.split('/').length) {
        subCategoryFrontmatter.set(parts[parts.length - 2], data);
      }
      continue;
    }
    let fileCategory: string;
    let fileSubCategory: string | undefined;
    if (parts.length === 2 + mdxDir.split('/').length) {
      fileCategory = parts[parts.length - 2];
    } else if (parts.length === 3 + mdxDir.split('/').length) {
      fileCategory = parts[parts.length - 3];
      fileSubCategory = parts[parts.length - 2];
    } else {
      throw new Error(`Invalid path (part length): ${parts.length}`);
    }

    // Verify frontmatter
    const requiredFrontmatter: RequiredFrontmatter = [
      ['title', 'string'],
      ['last_updated', 'string'],
    ];
    verifyFrontmatter(path, data, requiredFrontmatter);

    const { title, last_updated: lastUpdated } = data as {
      title: string;
      last_updated: string;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [slug, _ext] = fileName.split('.');

    returnedSlugs.push({
      title,
      slug: getCorrectSlug(slug),
      category: {
        title: categoryFrontmatter.get(fileCategory)?.title as string,
        slug: fileCategory,
      },
      subCategory: fileSubCategory
        ? {
            title: subCategoryFrontmatter.get(fileSubCategory)?.title as string,
            slug: fileSubCategory,
          }
        : undefined,
      position: getSlugPosition(slug),
      lastUpdated,
    });
  }

  return {
    slugs: returnedSlugs.reverse(),
  };
};

interface SubItem {
  name: string;
  slug: string;
  position: number;
  lastUpdated: string;
}
export interface Item {
  name?: string;
  slug: string;
  items?: SubItem[];
  position: number;
  lastUpdated?: string;
}

export interface OrderedSlugs {
  name: string;
  slug: string;
  items: Item[];
  position: number;
}

export const getOrderedSlugs = async (
  mdxDir: string
): Promise<OrderedSlugs[]> => {
  const slugs = await getSlugs(mdxDir);

  const ordered: OrderedSlugs[] = [];

  for (const doc of slugs.slugs) {
    const catIndex = ordered.findIndex(
      (cat) => cat.slug === removePos(doc.category.slug)
    );

    if (catIndex === -1 && doc.subCategory) {
      // If category doesn't exist, add it - for a subcategory doc
      ordered.push({
        name: doc.category.title,
        slug: getCorrectSlug(doc.category.slug),
        position: getSlugPosition(doc.category.slug),
        items: [
          {
            name: doc.subCategory.title,
            slug: getCorrectSlug(doc.subCategory.slug),
            position: getSlugPosition(doc.subCategory.slug),
            items: [
              {
                name: doc.title,
                slug: doc.slug,
                position: doc.position,
                lastUpdated: doc.lastUpdated,
              },
            ],
          },
        ],
      });
    } else if (catIndex === -1 && !doc.subCategory) {
      // If category doesn't exist, add it - for a category doc
      ordered.push({
        name: doc.category.title,
        slug: getCorrectSlug(doc.category.slug),
        position: getSlugPosition(doc.category.slug),
        items: [
          {
            name: doc.title,
            slug: doc.slug,
            position: doc.position,
          },
        ],
      });
    } else if (doc.subCategory) {
      // If category exists, add subcategory - for a subcategory doc
      const subCatIndex = ordered[catIndex].items.findIndex(
        (subCat) => subCat.slug === removePos(doc.subCategory?.slug as string)
      );

      if (subCatIndex === -1) {
        // If subcategory doesn't exist, add it
        ordered[catIndex].items.push({
          name: doc.subCategory.title,
          slug: getCorrectSlug(doc.subCategory.slug),
          position: getSlugPosition(doc.subCategory.slug),
          items: [
            {
              name: doc.title,
              slug: doc.slug,
              position: doc.position,
              lastUpdated: doc.lastUpdated,
            },
          ],
        });
      } else if (ordered[catIndex].items[subCatIndex].items) {
        // If subcategory exists, add doc
        (ordered[catIndex].items[subCatIndex].items as SubItem[]).push({
          name: doc.title,
          slug: doc.slug,
          position: doc.position,
          lastUpdated: doc.lastUpdated,
        });
      }
    } else {
      // If category exists, add doc - for a category doc
      ordered[catIndex].items.push({
        name: doc.title,
        slug: doc.slug,
        position: doc.position,
      });
    }
  }

  ordered.sort((first, second) => first.position - second.position);

  ordered.forEach((orderedSlug) => {
    orderedSlug.items.sort((first, second) => first.position - second.position);
  });

  return ordered;
};

export interface DocMetadata {
  slug: string;
  title: string;
  lastUpdated: string;
  next?: {
    slug: string;
    title: string;
    location: string[];
  };
  prev?: {
    slug: string;
    title: string;
    location: string[];
  };
}

export interface ReturnedDoc {
  source: MDXRemoteSerializeResult;
  meta: DocMetadata;
}

export const getDocFromSlug = async (
  slug: string,
  docsDir: string
): Promise<ReturnedDoc | undefined> => {
  /**
   * The `docsDir` paramter provided does not include the position prefix (01, 02, etc) in the directory name. This value is assigned to correctPath and is updated as the function progresses.
   */
  let correctPath = './';
  const docsSplit = docsDir.split('/');

  for (let idx = 0; idx < docsSplit.length; idx += 1) {
    const foundDirs = await fs.readdir(correctPath, { withFileTypes: true });
    const foundDir = foundDirs.find((dir) => {
      if (dir.name.split('-').length === 1 && dir.name === docsSplit[idx])
        return true;
      return dir.name.split('-').slice(1).join('-') === docsSplit[idx];
    });
    if (!foundDir) {
      // throw new Error(`No directory found: ${docsSplit[idx]}`);
      return undefined;
    }
    if (correctPath === './') correctPath = foundDir.name;
    else correctPath = `${correctPath}/${foundDir.name}`;
  }

  const foundSlugs = sync(`${correctPath}/*.mdx`.replaceAll('\\', '/'));

  const foundSlug = foundSlugs.find((useSlug) => {
    const realSlug = useSlug
      .replaceAll('\\', '/')
      .split('/')
      .slice(-1)[0]
      .split('.')[0];
    if (realSlug.split('-').length === 1 && realSlug === slug) return true;
    return realSlug.split('-').slice(1).join('-') === slug;
  });

  if (!foundSlug) {
    throw new Error(`No slug found: ${slug}`);
  }

  // Use receieved directory and slug (url) to get the doc file
  const docPath = path.join(process.cwd(), foundSlug);

  // Extract content and meta data from file
  const source = await fs.readFile(docPath);
  const result = matter(source);
  const data = result.data as { title: string; last_updated: string };

  // Verify frontmatter
  const requiredFrontmatter: RequiredFrontmatter = [
    ['title', 'string'],
    ['last_updated', 'string'],
  ];
  verifyFrontmatter(docPath, data, requiredFrontmatter);

  const mdxSource = await serialize(result.content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        rehypeHighlight as unknown as () => void,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
      remarkPlugins: [remarkGfm],
    },
  });

  const getNextAndPrev = async (
    slug: string,
    docsDir: string
  ): Promise<{
    next: DocMetadata['next'] | undefined;
    prev: DocMetadata['prev'] | undefined;
  }> => {
    const slugs = await getSlugs(docsDir.split('/')[0]);
    const index = slugs.slugs.findIndex((slg) => slg.slug === slug);
    if (index === -1) {
      throw new Error(`No slug found: ${slug}`);
    }
    const next = slugs.slugs[index + 1] || undefined;
    const prev = slugs.slugs[index - 1] || undefined;

    return {
      next: next
        ? {
            slug: `/${removePos(next.category.slug)}${
              next.subCategory?.slug
                ? `/${removePos(next.subCategory.slug)}`
                : ''
            }/${next.slug}`,
            title: next.title,
            location: [
              next.category.title,
              next.subCategory?.title ?? undefined,
              next.title,
            ].filter((loc) => loc !== undefined) as string[],
          }
        : undefined,
      prev: prev
        ? {
            slug: `/${removePos(prev.category.slug)}${
              prev.subCategory?.slug
                ? `/${removePos(prev.subCategory.slug)}`
                : ''
            }/${prev.slug}`,
            title: prev.title,
            location: [
              prev.category.title,
              prev.subCategory?.title ?? undefined,
              prev.title,
            ].filter((loc) => loc !== undefined) as string[],
          }
        : undefined,
    };
  };

  const { next, prev } = await getNextAndPrev(slug, docsDir);

  // Return all data to display doc
  return {
    source: mdxSource,
    meta: {
      slug,
      title: data.title,
      lastUpdated: data.last_updated,
      next,
      prev,
    },
  };
};

export const getAllDocs = async (
  docsDir: string,
  results: number
): Promise<DocMetadata[]> => {
  // Sort blogs by dates - from most recent to oldest
  const docs = await Promise.all(
    (await getSlugs(docsDir)).slugs.map((slug) =>
      getDocFromSlug(slug.slug, docsDir)
    )
  );
  // Return meta data of last {docsDir} docs - not markdown
  return docs.slice(0, results || 999).map((doc) => doc?.meta as DocMetadata);
};
