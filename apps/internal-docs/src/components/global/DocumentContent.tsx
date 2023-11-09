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
  // Detect external links and add target="_blank" and rel="noreferrer"
  useEffect(() => {
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
        link.classList.add('link-200');
      }
    }
  }, []);

  return (
    <div className="mx-auto mb-20 mt-10 w-11/12 max-w-5xl lg:mb-28 lg:mt-20 xl:mb-52">
      <div className="flex">
        <div id="mdx-content" className="w-full">
          <h1 className="text-text my-3 block text-4xl font-bold leading-[1.2] md:text-5xl">
            {doc.meta.title}
          </h1>
          <p className="text-text-secondary mt-5 block text-sm">
            <b className="font-semibold">Last Updated: </b>
            {doc.meta.lastUpdated}
          </p>
          <div className="bg-border mt-5 h-px w-full"></div>
          <div className={`text-text-secondary mb-10 mt-8 ${styles.content}`}>
            {doc.source && (
              <MDXRemote
                source={doc.source}
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
                components={{ Link, ...uiComponents }}
              />
            )}
          </div>

          <div className="border-border flex border-t pt-10">
            <div className="w-1/2 pr-2">
              {doc.meta.prev && (
                <Link
                  href={doc.meta.prev.slug}
                  className="bg-background border-border hover:bg-background-secondary active:bg-background-tertiary hover:border-link active:border-link block h-full rounded-lg border p-5 text-left transition duration-300"
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
                      <span key={index}>
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

            <div className="w-1/2 pl-2">
              {doc.meta.next && (
                <Link
                  href={doc.meta.next.slug}
                  className="bg-background border-border hover:bg-background-secondary active:bg-background-tertiary hover:border-link active:border-link block h-full rounded-lg border p-5 text-right transition duration-300"
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
                      <span key={index}>
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
        <uiComponents.Toc
          editLink={`https://github.com/odnlabs/opendevnet/tree/dev/apps/internal-docs/${doc.meta.path}`}
        />
      </div>
    </div>
  );
};

export default DocumentContent;
