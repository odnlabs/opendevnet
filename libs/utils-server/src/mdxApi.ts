import fs from 'fs/promises';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';

import {
  DocMetadata,
  OrderedSlugs,
  ReturnedDoc,
  Slug,
  SubItem,
} from '@odnlabs/utils-client';

/**
 * Remove the positon prefix from a slug.
 * @param slug The original slug to remove the prefix from.
 * @returns The refomatted slug.
 */
const removePos = (slug: string): string => slug.split('-').slice(1).join('-');

/**
 * Get the position from a slug.
 * @param slug The original slug to get the position from.
 * @returns The position.
 * @throws If the position is not a number.
 */
const getSlugPosition = (slug: string): number => {
  const pos = slug.split('-')[0];
  if (!pos) throw new Error(`No slug position found: ${slug}`);
  const position = parseInt(pos, 10);
  if (Number.isNaN(position)) throw new Error(`Invalid slug position: ${slug}`);
  return position;
};

type RequiredFrontmatter = [string, 'string' | 'number' | 'boolean'][];

/**
 * Verifies all of the required frontmatter for a file is provided.
 * @param path The path of the file.
 * @param data The frontmatter data.
 * @param requiredFrontmatter The required frontmatter and their types.
 */
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

/**
 * Get all slugs from a directory.
 * @param mdxDir A directory containing mdx files.
 * @returns An array of slugs.
 */
export const getSlugs = async (mdxDir: string): Promise<{ slugs: Slug[] }> => {
  const categoryFrontmatter = new Map<
    string,
    { title: string; description?: string | undefined }
  >();
  const subCategoryFrontmatter = new Map<
    string,
    { title: string; description?: string | undefined }
  >();

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
    const { data } = matter(source) as unknown as {
      data: { title: string; description?: string | undefined };
    };

    // Parts
    const parts = path.replaceAll('\\', '/').split('/');
    const fileName = parts[parts.length - 1];
    // Skip index.mdx
    if (fileName === 'index.mdx') {
      // Verify frontmatter
      const requiredFrontmatter: RequiredFrontmatter = [['title', 'string']];
      verifyFrontmatter(path, data, requiredFrontmatter);

      if (parts.length === 2 + mdxDir.split('/').length) {
        const part = parts[parts.length - 2];
        if (!part) throw new Error(`No part found: ${path}`);
        categoryFrontmatter.set(part, data);
      }
      if (parts.length === 3 + mdxDir.split('/').length) {
        const part = parts[parts.length - 2];
        if (!part) throw new Error(`No part found: ${path}`);
        subCategoryFrontmatter.set(part, data);
      }
      continue;
    }
    let fileCategory: string | undefined;
    let fileSubCategory: string | undefined;
    if (parts.length === 2 + mdxDir.split('/').length) {
      fileCategory = parts[parts.length - 2];
    } else if (parts.length === 3 + mdxDir.split('/').length) {
      fileCategory = parts[parts.length - 3];
      fileSubCategory = parts[parts.length - 2];
    } else {
      throw new Error(`Invalid path (part length): ${parts.length}`);
    }

    if (!fileName) throw new Error(`No file name found: ${path}`);
    if (!fileCategory) throw new Error(`No category found: ${path}`);

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

    if (!slug) throw new Error(`No slug found: ${path} at path ${fileName}`);

    returnedSlugs.push({
      title,
      slug: removePos(slug),
      category: {
        title: categoryFrontmatter.get(fileCategory)?.title as string,
        description: categoryFrontmatter.get(fileCategory)
          ?.description as string,
        slug: fileCategory,
      },
      subCategory: fileSubCategory
        ? {
            title: subCategoryFrontmatter.get(fileSubCategory)?.title as string,
            description: subCategoryFrontmatter.get(fileSubCategory)
              ?.description as string,
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

/**
 * Returns the list of slugs in a structured format.
 * @param mdxDir The root directory containing the mdx files.
 * @returns The list of slugs in a structured format.
 */
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
        description: doc.category.description,
        slug: removePos(doc.category.slug),
        position: getSlugPosition(doc.category.slug),
        items: [
          {
            name: doc.subCategory.title,
            description: doc.subCategory.description,
            slug: removePos(doc.subCategory.slug),
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
        description: doc.category.description,
        slug: removePos(doc.category.slug),
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
      const cat = ordered[catIndex];

      if (!cat) throw new Error(`No category found: ${doc.category.slug}`);

      // If category exists, add subcategory - for a subcategory doc
      const subCatIndex = cat.items.findIndex(
        (subCat) => subCat.slug === removePos(doc.subCategory?.slug as string)
      );

      if (subCatIndex === -1) {
        // If subcategory doesn't exist, add it
        cat.items.push({
          name: doc.subCategory.title,
          description: doc.category.description,
          slug: removePos(doc.subCategory.slug),
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
      } else if (cat.items[subCatIndex]?.items) {
        // If subcategory exists, add doc
        (cat.items[subCatIndex]?.items as SubItem[]).push({
          name: doc.title,
          slug: doc.slug,
          position: doc.position,
          lastUpdated: doc.lastUpdated,
        });
      }
    } else {
      // If category exists, add doc - for a category doc
      ordered[catIndex]?.items.push({
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

/**
 * Get a doc from a slug.
 * @param rootDir The root directory of the project.
 * @param slug The slug of the doc to get.
 * @param options The options for the function.
 * @param options.nextAndPrev Whether to get the next and previous slugs metadata.
 * @returns The doc.
 */
export const getDocFromSlug = async (
  rootDir: string,
  slug: string,
  { nextAndPrev = false }: { nextAndPrev?: boolean } = {}
): Promise<ReturnedDoc | undefined> => {
  /**
   * The `slug` paramter provided does not include the position prefix (01, 02, etc) in the directory name. This value is assigned to correctPath and is updated as the function progresses.
   */

  let correctPath = './';

  /**
   * Example: "mdx/docs/introduction" would be the value of `docDir` if `rootDir` is "mdx" and `slug` is "introduction/getting-started".
   * Example: "mdx/docs" would be the value of `docDir` if `rootDir` is "mdx" and `slug` is "getting-started".
   */
  const docDir = `${rootDir}/${slug.split('/').slice(0, -1).join('/')}`;
  if (!docDir) throw new Error(`No doc dir found: ${rootDir}`);

  /**
   * Example: "getting-started" would be the value of `onlySlug` if `slug` is "introduction/getting-started".
   */
  const onlySlug = slug.split('/').slice(-1)[0];

  if (!onlySlug) throw new Error(`No only slug found: ${slug} at ${rootDir}`);

  const docsSplit = docDir.split('/');

  // This loop will find the correct directory to get the doc from based on the `slug` parameter.
  // The correct directory just includes the position prefix (01, 02, etc) in the directory name.
  for (let idx = 0; idx < docsSplit.length; idx += 1) {
    // if parent directory
    if (docsSplit[idx] === '..') {
      correctPath += '../';
      continue;
    }
    const foundDirs = await fs.readdir(correctPath, { withFileTypes: true });
    const foundDir = foundDirs.find((dir) => {
      if (dir.name.split('-').length === 1 && dir.name === docsSplit[idx]) {
        return true;
      }
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
      ?.split('.')[0];
    if (realSlug?.split('-').length === 1 && realSlug === onlySlug) return true;
    return realSlug?.split('-').slice(1).join('-') === onlySlug;
  });

  if (!foundSlug) {
    throw new Error(`No slug found: ${onlySlug} at path ${correctPath}`);
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

  /**
   * Get the next and previous slugs metadata.
   * @param fullSlug The current slug.
   * @returns The next and previous slugs metadata.
   */
  const getNextAndPrev = async (
    fullSlug: string
  ): Promise<{
    next: DocMetadata['next'] | undefined;
    prev: DocMetadata['prev'] | undefined;
  }> => {
    const slugs = await getSlugs(rootDir);
    const index = slugs.slugs.findIndex((slg) => slg.slug === fullSlug);
    if (index === -1) {
      throw new Error(`No slug found: "${fullSlug}" at path "${rootDir}"`);
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

  let next;
  let prev;
  if (nextAndPrev) {
    ({ next, prev } = await getNextAndPrev(onlySlug));
  }

  // Return all data to display doc
  return {
    source: result.content,
    meta: {
      slug: onlySlug,
      title: data.title,
      lastUpdated: data.last_updated,
      next: nextAndPrev ? next : undefined,
      prev: nextAndPrev ? prev : undefined,
      path: foundSlug,
    },
  };
};

/**
 * Get a doc from a slug that isn't located in directories with position prefixes.
 * @param filePath The full path of the doc.
 * @returns The doc.
 */
export const getDocFromDirectSlug = async (
  filePath: string
): Promise<{
  source: string;
  meta: { title: string; lastUpdated: string };
}> => {
  // If the file path doesn't end with .mdx, add it
  const filePathWithExt = filePath.endsWith('.mdx')
    ? filePath
    : `${filePath}.mdx`;

  // Use receieved directory and slug (url) to get the doc file
  const fullFilePath = path.join(process.cwd(), filePathWithExt);

  // Extract content and meta data from file
  const source = await fs.readFile(fullFilePath);
  const result = matter(source);
  const data = result.data as { title: string; last_updated: string };

  // Verify frontmatter
  const requiredFrontmatter: RequiredFrontmatter = [
    ['title', 'string'],
    ['last_updated', 'string'],
  ];

  verifyFrontmatter(fullFilePath, data, requiredFrontmatter);

  // Return all data to display doc
  return {
    source: result.content,
    meta: {
      title: data.title,
      lastUpdated: data.last_updated,
    },
  };
};
