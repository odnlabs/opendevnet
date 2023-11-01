'use client';

import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import { useEffect } from 'react';

import { HiChevronUp } from '@react-icons/all-files/hi/HiChevronUp';

import styles from '@odnlabs/ui/styles/modules/doc.module.css';
import { mdxApi } from '@odnlabs/utils';

import * as uiComponents from '../uiClientComponents';

export const DocumentContent: React.FC<{ doc: mdxApi.ReturnedDoc }> = ({
  doc,
}) => {
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
    <div className="flex mt-10 lg:mt-20 mb-20 lg:mb-28 xl:mb-52 max-w-5xl mx-auto w-11/12">
      <div id="mdx-content" className="w-full">
        <h1 className="my-3 block text-4xl font-bold leading-[1.2] text-text md:text-5xl">
          {doc.meta.title}
        </h1>
        <p className="block mt-5 text-sm text-text-secondary">
          <b className="font-semibold">Last Updated: </b>
          {doc.meta.lastUpdated}
        </p>
        <div className="mt-5 h-px w-full bg-border"></div>
        <div className={`mb-10 mt-8 text-text-secondary ${styles.content}`}>
          {doc.source && (
            <MDXRemote {...doc.source} components={{ Link, ...uiComponents }} />
          )}
        </div>

        {(doc.meta.prev || doc.meta.next) && (
          <div className="pt-10 border-t border-border flex">
            <div className="w-1/2 pr-2">
              {doc.meta.prev && (
                <Link
                  href={`/help${doc.meta.prev.slug}`}
                  className="block h-full p-5 rounded-lg bg-background border border-border hover:bg-background-secondary active:bg-background-tertiary transition duration-300 hover:border-link active:border-link text-left"
                >
                  <p className="text-text-secondary text-sm font-medium">
                    Previous
                  </p>
                  <p className="mt-2 text-link font-medium text-base">
                    <HiChevronUp className="h-6 w-6 -rotate-90 inline-block -ml-2 -mt-0.5" />
                    {doc.meta.prev.title}
                  </p>
                  <p className="mt-3 text-xs text-text-faint font-medium">
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
                  href={`/help${doc.meta.next.slug}`}
                  className="block h-full p-5 rounded-lg bg-background border border-border hover:bg-background-secondary active:bg-background-tertiary transition duration-300 hover:border-link active:border-link text-right"
                >
                  <p className="text-text-secondary text-sm font-medium">
                    Next
                  </p>
                  <p className="mt-2 text-link font-medium text-base">
                    {doc.meta.next.title}
                    <HiChevronUp className="h-6 w-6 rotate-90 inline-block -mr-2 -mt-0.5" />
                  </p>
                  <p className="mt-3 text-xs text-text-faint font-medium">
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
        )}
      </div>

      <uiComponents.Toc />
    </div>
  );
};
