import { useEffect, useRef, useState } from 'react';

import { HiOutlineExternalLink } from '@react-icons/all-files/hi/HiOutlineExternalLink';

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

interface TocProps {
  editLink?: string | undefined;
}

/**
 * Table of Contents.
 * @param options The options for the Table of Contents.
 * @param options.editLink The link to the edit page.
 * @returns The Table of Contents component.
 */
export const Toc: React.FC<TocProps> = ({ editLink }) => {
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
      <div className="min-w-60 max-w-60 relative ml-20">
        <div className="min-w-60 max-w-60 fixed top-40">
          <p className="border-border border-b py-2 font-semibold">
            Table of Contents
          </p>
          <ul className="pt-2">
            {headings.map((heading) => (
              <li key={heading.id} className={styles[heading.level - 1]}>
                <a
                  href={`#${heading.id}`}
                  className={`text-sm ${
                    activeId === heading.id
                      ? 'link font-semibold'
                      : 'text-text-primary hover:underline'
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
          {editLink && (
            <div className="border-border mt-3 border-t text-sm">
              <a
                href={editLink}
                target="_blank"
                rel="noreferrer"
                className="text-text-secondary hover:text-text active:text-text my-2 flex"
              >
                Edit this page on GitHub
                <HiOutlineExternalLink className="ml-1.5 mt-1 h-3 w-3 translate-y-px" />
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
