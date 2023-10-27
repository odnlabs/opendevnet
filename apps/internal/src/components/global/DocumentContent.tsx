'use client';

import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
// import rehypeHighlight from 'rehype-highlight';

import styles from '@styles/modules/doc.module.css';
import { ReturnedDoc } from '@utils/mdxApi';
import * as uiComponents from './uiClientComponents';

const DocumentContent: React.FC<{ doc: ReturnedDoc }> = ({ doc }) => (
  <div>
    <h1 className="my-3 block text-4xl font-bold leading-[1.2] text-text-primary md:text-5xl">
      {doc.meta.title}
    </h1>
    <p className="block mt-2 text-sm text-text-secondary">
      <b className="font-semibold">Last Updated: </b>
      {doc.meta.lastUpdated}
    </p>
    <div className="mt-5 h-px w-full bg-border"></div>
    <div className={`mb-24 mt-8 text-text-secondary ${styles.content}`}>
      {doc.source && (
        <MDXRemote {...doc.source} components={{ Link, ...uiComponents }} />
      )}
    </div>
  </div>
);

export default DocumentContent;
