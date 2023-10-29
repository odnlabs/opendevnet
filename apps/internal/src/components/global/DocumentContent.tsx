'use client';

import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import { useEffect } from 'react';
// import rehypeHighlight from 'rehype-highlight';

import styles from '@styles/modules/doc.module.css';
import { ReturnedDoc } from '@utils/mdxApi';
import * as uiComponents from './uiClientComponents';

import { Alert } from './Alert';
import { TableOfContents } from './TableOfContents';

const DocumentContent: React.FC<{ doc: ReturnedDoc }> = ({ doc }) => {
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
      if (links[index].href.indexOf('#') === -1) {
        if (links[index].hostname !== window.location.hostname) {
          links[index].target = '_blank';
          links[index].rel = 'noreferrer';
        }
        links[index].classList.add('link-200');
      }
    }
  }, []);

  return (
    <div className="mt-10 lg:mt-20 mb-20 lg:mb-28 xl:mb-52 max-w-5xl mx-auto w-11/12">
      <div className="flex">
        <div id="mdx-content">
          <h1 className="my-3 block text-4xl font-bold leading-[1.2] text-text md:text-5xl">
            {doc.meta.title}
          </h1>
          <p className="block mt-2 text-sm text-text-secondary">
            <b className="font-semibold">Last Updated: </b>
            {doc.meta.lastUpdated}
          </p>
          <div className="mt-5 h-px w-full bg-border"></div>
          <div className={`mb-24 mt-8 text-text-secondary ${styles.content}`}>
            {doc.source && (
              <MDXRemote
                {...doc.source}
                components={{ Link, ...uiComponents, Alert }}
              />
            )}
          </div>
        </div>
        <TableOfContents />
      </div>
    </div>
  );
};

export default DocumentContent;
