import React, { useEffect, useState } from 'react';

interface DefaultLink {
  label: string;
  route?: string;
  onClick?: () => void;
}

export default function MoreNavLinks({
  moreLinksOpen,
  setMoreLinksOpen,
  site,
}: {
  moreLinksOpen: boolean;
  setMoreLinksOpen: (open: boolean) => void;
  site?: string | undefined;
}): JSX.Element {
  const links: DefaultLink[][] = [
    [
      {
        label: 'Home Page',
        route: '/',
      },
      {
        label: 'About',
        route: '/about',
      },
      {
        label: 'Contact Us',
        route: '/contact',
      },
      {
        label: 'Blog',
        route: '/blog',
      },
    ],
    [
      {
        label: 'Help Center',
        route: '/help',
      },
      {
        label: 'Internal Docs',
        route: '/internal-docs',
      },
      {
        label: 'Change Log',
        route: '/changelog',
      },
      {
        label: 'Sitemap',
        route: '/sitemap',
      },
    ],
    [
      {
        label: 'Terms of Service',
        route: '/terms',
      },
      {
        label: 'Privacy Policy',
        route: '/privacy',
      },
      {
        label: 'Guidelines',
        route: '/guidelines',
      },
      {
        label: 'Accessibility',
        route: '/accessibility',
      },
      {
        label: 'Licenses',
        route: '/licenses',
      },
    ],
  ];

  const linkClass =
    'block px-2 text-text-secondary py-1 rounded-md hover:text-text active:text-text hover:bg-secondary active:bg-secondary-hover';

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    const button = document.getElementById('more-links-dropdown-btn');
    const container = document.getElementById('more-links-dropdown-container');

    document.onclick = (event) => {
      const target = event.target as Element;
      if (!button?.contains(target) && !container?.contains(target)) {
        setMoreLinksOpen(false);
      }
    };
  }

  return (
    <div
      className={`bg-background-secondary border-border absolute bottom-2 left-12 w-48 origin-bottom-left rounded-md border p-1 text-sm transition-[visibility,opacity,transform] duration-300 ${
        !moreLinksOpen && 'invisible scale-95 opacity-0'
      }`}
      id="more-links-dropdown-container"
    >
      {links.map((section, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <div className="bg-text/20 my-1 h-px w-full"></div>}
          {section.map((btn, btnIndex) =>
            btn.route ? (
              <a
                href={`${site ?? ''}${btn.route}`}
                target="_blank"
                rel="noopener noreferrer"
                key={btnIndex}
                className={linkClass}
              >
                {btn.label}
              </a>
            ) : (
              <button
                onClick={btn.onClick}
                key={btnIndex}
                className={linkClass}
              >
                {btn.label}
              </button>
            )
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
