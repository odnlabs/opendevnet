import { useEffect, useRef, useState } from 'react';

import { HiOutlineExternalLink } from '@react-icons/all-files/hi/HiOutlineExternalLink';

/**
 * Hook to observe the headings.
 * @returns The active heading id.
 */
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
  interface Heading {
    id: string;
    text: string;
    level: number;
  }

  const [headings, setHeadings] = useState<Heading[]>([]);
  const [tocPosition, setTocPosition] = useState<
    'relative' | 'fixed' | 'absolute'
  >('relative');
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(false);

  const { activeId } = useHeadsObserver();

  const tocRef = useRef<HTMLDivElement>(null);

  /**
   * Get the headings from the markdown content.
   */
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

  const headerHeight = 56;
  const tocFromTop = 80;

  useEffect(() => {
    const handleScroll = (): void => {
      const footer = document.getElementById('footer');
      const toc = tocRef.current;

      if (!footer || !toc) return;

      const tocHeight = toc.offsetHeight;
      const footerPosition = footer.getBoundingClientRect().top;

      const remainingSpace = window.innerHeight - footerPosition;
      const shouldStick =
        tocHeight + remainingSpace > window.innerHeight - tocFromTop - 208; // 208 for padding

      if (window.innerWidth < 768) {
        if (!isMobileWidth) setIsMobileWidth(true);
        setTocPosition('relative');
        return;
      }

      if (isMobileWidth) setIsMobileWidth(false);
      if (shouldStick) return setTocPosition('absolute');
      const borderWidth = 1;
      setTocPosition(
        window.scrollY > headerHeight - borderWidth ? 'fixed' : 'relative'
      );
    };

    /**
     * Handles the resize event.
     * @returns Nothing.
     */
    const handleResize = (): void => {
      return window.innerWidth < 768
        ? setIsMobileWidth(true)
        : setIsMobileWidth(false);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileWidth]);

  const styles = [
    '', // h1
    'ml-2', // h2
    'ml-4', // h3
    'ml-6', // h4
  ];

  return (
    <div className="min-w-60 max-w-60 relative ml-20 min-h-full">
      <div
        className={`min-w-60 max-w-60 ${
          tocPosition === 'relative'
            ? 'relative'
            : tocPosition === 'fixed'
              ? 'fixed top-20'
              : 'absolute bottom-0'
        }`}
        ref={tocRef}
      >
        <p className="border-border border-b py-2 font-semibold">
          Table of Contents
        </p>
        <ul className="pt-2">
          {headings.map((heading) => (
            <li className={styles[heading.level - 1]} key={heading.id}>
              <a
                className={`relative text-sm after:absolute after:-bottom-0.5 after:-left-1 after:-right-1 after:-top-0.5 after:rounded-md after:focus-visible:ring ${
                  activeId === heading.id
                    ? 'link font-semibold'
                    : 'text-text-primary hover:underline'
                }`}
                href={`#${heading.id}`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
        {editLink && (
          <div className="border-border mt-3 border-t text-sm">
            <a
              className="text-text-secondary hover:text-text active:text-text relative my-2 flex after:absolute after:-bottom-0.5 after:-left-1 after:-right-1 after:-top-0.5 after:rounded-md after:focus-visible:ring"
              href={editLink}
              rel="noreferrer"
              target="_blank"
            >
              Edit this page on GitHub
              <HiOutlineExternalLink className="ml-1.5 mt-1 h-3 w-3 translate-y-px" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
