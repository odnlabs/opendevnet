'use client';

import { useEffect, useRef, useState } from 'react';

interface TableOfContentsProps {}

const useHeadsObserver = (): { activeId: string } => {
  const observer = useRef<IntersectionObserver | undefined>();
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleObsever: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: '-20% 0% -35% 0px',
    });

    const mdxContent = document.getElementById('mdx-content');
    if (!mdxContent) return;
    const elements = mdxContent.querySelectorAll('h2, h3, h4');
    elements.forEach((elem) => observer.current?.observe(elem));
    return () => observer.current?.disconnect();
  }, []);

  return { activeId };
};

export const TableOfContents: React.FC<TableOfContentsProps> = () => {
  const [headings, setHeadings] = useState<
    {
      id: string;
      text: string;
      level: number;
    }[]
  >([]);

  const { activeId } = useHeadsObserver();

  useEffect(() => {
    const mdxContent = document.getElementById('mdx-content');
    if (!mdxContent) return;
    const elements = Array.from(mdxContent.querySelectorAll('h2, h3, h4')).map(
      (elem) => ({
        id: elem.id,
        text: (elem as HTMLElement).innerText,
        level: Number(elem.nodeName.charAt(1)),
      })
    );
    setHeadings(elements);
  }, []);

  const styles = [
    '', // h1
    'ml-2', // h2
    'ml-4', // h3
    'ml-6', // h4
  ];

  return (
    <>
      <div className="relative min-w-60 max-w-60 ml-20">
        <div className="fixed top-40 min-w-60 max-w-60">
          <p className="border-b border-border py-2 font-semibold">
            Table of Contents
          </p>
          <ul className="pt-2">
            {headings.map((heading) => (
              <li key={heading.id} className={styles[heading.level - 1]}>
                <a
                  href={`#${heading.id}`}
                  onClick={(event) => {
                    event.preventDefault();

                    document.getElementById(`#${heading.id}`)?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                  className={`text-sm ${
                    activeId === heading.id
                      ? 'font-bold link'
                      : 'text-text-primary hover:underline'
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
