'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { useEffect } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { HiChevronUp } from '@react-icons/all-files/hi/HiChevronUp';

import styles from '@odnlabs/ui/styles/modules/doc.module.css';
import { ReturnedDoc } from '@odnlabs/utils-client';

import * as uiComponents from './uiClientComponents';

interface DocumentContentProps {
  doc: ReturnedDoc;
}

const DocumentContent: React.FC<DocumentContentProps> = ({ doc }) => {
  useEffect(() => {
    // Detect external links and add target="_blank" and rel="noreferrer"
    const links = document
      .getElementById('mdx-content')
      ?.getElementsByTagName('a');
    if (!links) return;
    for (
      let index = 0, linksLength = links.length;
      index < linksLength;
      index += 1
    ) {
      const link = links[index];

      if (!link) continue;

      if (link.href.indexOf('#') === -1) {
        if (link.hostname !== window.location.hostname) {
          link.target = '_blank';
          link.rel = 'noreferrer';
        }
        link.classList.add('link');
      }
    }

    // Create div elements as parents for each table.
    // Then overflow-x: auto can be applied to the parent, allowing for reponsive tables.
    const tables = document.getElementsByTagName('table');
    if (!tables) return;
    for (
      let index = 0, tablesLength = tables.length;
      index < tablesLength;
      index += 1
    ) {
      const table = tables[index];
      if (!table) continue;
      const parent = document.createElement('div');
      parent.classList.add('table-parent');
      table.parentNode?.insertBefore(parent, table);
      parent.appendChild(table);
    }
  }, []);

  return (
    <div className="mx-auto mb-20 mt-8 w-11/12 max-w-5xl lg:mb-28 xl:mb-52 xl:mt-10 2xl:mt-20">
      <div className="flex-row-reverse xl:flex">
        <uiComponents.Toc
          editLink={`https://github.com/odnlabs/opendevnet/tree/dev/docs/internal/${doc.meta.path}`}
        />
        <div className="w-full" id="mdx-content">
          <h1 className="text-text my-3 block text-4xl font-bold leading-[1.2] md:text-5xl">
            {doc.meta.title}
          </h1>
          <p className="text-text-secondary mt-5 block text-sm">
            <b className="font-semibold">Last Updated: </b>
            {doc.meta.lastUpdated}
          </p>
          <div className="bg-border mt-5 h-px w-full" />
          <div
            className={`text-text-secondary relative mb-10 mt-8 w-full max-w-3xl ${styles.content}`}
          >
            {doc.source && (
              <MDXRemote
                components={{ Link, ...uiComponents }}
                options={{
                  mdxOptions: {
                    rehypePlugins: [
                      rehypeSlug,
                      rehypeHighlight as unknown as () => void,
                      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                    ],
                    remarkPlugins: [remarkGfm],
                    development: process.env.NODE_ENV !== 'production',
                  },
                }}
                source={doc.source}
              />
            )}
          </div>
          <div className="border-border flex flex-wrap border-t pt-10">
            <div className="w-full sm:w-1/2 lg:pr-2">
              {doc.meta.prev && (
                <Link
                  className="bg-background border-border hover:bg-background-secondary active:bg-background-tertiary hover:border-link active:border-link block h-full rounded-lg border p-5 text-left transition duration-300 hover:no-underline"
                  href={doc.meta.prev.slug}
                >
                  <p className="text-text-secondary text-sm font-medium">
                    Previous
                  </p>
                  <p className="text-link mt-2 text-base font-medium">
                    <HiChevronUp className="-ml-2 -mt-0.5 inline-block h-6 w-6 -rotate-90" />
                    {doc.meta.prev.title}
                  </p>
                  <p className="text-text-faint mt-3 text-xs font-medium">
                    {doc.meta.prev.location.map((part, index) => (
                      <span key={part}>
                        {part}
                        {doc.meta.prev?.location &&
                          index !== doc.meta.prev.location.length - 1 && (
                            <span className="mx-1">/</span>
                          )}
                      </span>
                    ))}
                  </p>
                </Link>
              )}
            </div>
            <div className="w-full pt-2 sm:w-1/2 sm:pl-2 sm:pt-0">
              {doc.meta.next && (
                <Link
                  className="bg-background border-border hover:bg-background-secondary active:bg-background-tertiary hover:border-link active:border-link block h-full rounded-lg border p-5 text-right transition duration-300 hover:no-underline"
                  href={doc.meta.next.slug}
                >
                  <p className="text-text-secondary text-sm font-medium">
                    Next
                  </p>
                  <p className="text-link mt-2 text-base font-medium">
                    {doc.meta.next.title}
                    <HiChevronUp className="-mr-2 -mt-0.5 inline-block h-6 w-6 rotate-90" />
                  </p>
                  <p className="text-text-faint mt-3 text-xs font-medium">
                    {doc.meta.next.location.map((part, index) => (
                      <span key={part}>
                        {part}
                        {doc.meta.next?.location &&
                          index !== doc.meta.next.location.length - 1 && (
                            <span className="mx-1">/</span>
                          )}
                      </span>
                    ))}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentContent;
