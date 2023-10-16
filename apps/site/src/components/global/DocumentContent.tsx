'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';
// import rehypeHighlight from 'rehype-highlight';

import styles from '@styles/modules/doc.module.css';

interface DocData {
  source: MDXRemoteSerializeResult;
  title: string;
}

const DocumentContent: React.FC<{ doc: DocData }> = ({ doc }) => (
  <div>
    <h1 className="my-3 block text-4xl font-bold leading-[1.2] text-text-primary md:text-5xl">
      {doc.title}
    </h1>
    <div className="mt-5 h-px w-full bg-border"></div>
    <div className={`mb-24 mt-8 text-text-secondary ${styles.content}`}>
      <MDXRemote {...doc.source} components={{ Link }} />
    </div>
  </div>
);

export default DocumentContent;
