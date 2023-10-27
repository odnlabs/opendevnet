import fs from 'fs/promises';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

interface ReturnedSlug {
  slug: string;
  cat: string;
  title: string;
}

export const getSlugs = async (docsDir: string): Promise<ReturnedSlug[]> => {
  // Recieve directory and get all mdx files in the directory
  const DOCS_PATH = path.join(process.cwd(), docsDir);

  const categories = (
    await fs.readdir(DOCS_PATH, { withFileTypes: true })
  ).reduce((total: string[], current) => {
    if (current.isDirectory()) total.push(current.name);
    return total;
  }, []);

  const paths: string[] = [];
  for (const cat of categories) {
    const categorySlugs = sync(`${docsDir}/${cat}/*.mdx`.replaceAll('\\', '/'));
    categorySlugs.forEach((slugPath) => {
      paths.push(slugPath);
    });
  }

  const returnedSlugs: ReturnedSlug[] = [];

  for (const path of paths) {
    // Get the file slug (name without extension)
    const source = await fs.readFile(path);
    const { data } = matter(source);

    if (typeof data.title !== 'string') {
      throw new Error(
        `No title found in ${path}. Please add a title to the frontmatter`
      );
    }

    const { title } = data;

    // Parts
    const parts = path.replaceAll('\\', '/').split('/');
    const fileName = parts[parts.length - 1];
    const fileCat = parts[parts.length - 2];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [slug, _ext] = fileName.split('.');
    returnedSlugs.push({ slug, cat: fileCat, title });
  }

  return returnedSlugs;
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
  const DOCS_PATH = path.join(process.cwd(), docsDir);
  const docPath = path.join(DOCS_PATH, `${slug}.mdx`);

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

interface StructuredPath {
  category: string;
  items: { title: string; slug: string }[];
}

export const structurePaths = async (
  dirName: string
): Promise<StructuredPath[]> => {
  const paths = (await getSlugs(dirName)).map(({ slug, cat, title }) => ({
    params: { slug, category: cat, title },
  }));

  const data: StructuredPath[] = [];

  paths.forEach((path) => {
    const { slug, title, category } = path.params;

    // Ensure object for category exists
    const categoryIndex = data.findIndex((cat) => cat.category === category);
    if (categoryIndex === -1) {
      data.push({
        category,
        items: [],
      });
    }

    // Ensure object for section within category exists
    const newCategoryIndex = data.findIndex((cat) => cat.category === category);

    // Add item to section
    data[newCategoryIndex].items.push({
      title,
      slug,
    });
  });

  return data;
};
