import React from 'react';

interface DefaultLink {
  label: string;
  route?: string;
  onClick?: () => void;
}

const MoreNavLinks = () => {
  const links: DefaultLink[][] = [
    [
      {
        label: 'Change Log',
        route: '/changelog',
      },
      {
        label: 'Help Center',
        route: '/help',
      },
      {
        label: 'Developers',
        route: '/developers',
      },
    ],
  ];

  const linkClass =
    'block px-3 text-text-secondary py-1.5 rounded-md hover:text-text active:text-text hover:bg-secondary active:bg-secondary-hover';

  return (
    <div className="absolute bottom-2 left-12 w-48 p-1 text-sm bg-background-secondary rounded-lg border border-border">
      {links.map((section, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <div className="w-full h-px my-2 bg-text/20"></div>}
          {section.map((btn, i) =>
            btn.route ? (
              <a href={btn.route} className={linkClass}>
                {btn.label}
              </a>
            ) : (
              <button onClick={btn.onClick} className={linkClass}>
                {btn.label}
              </button>
            )
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MoreNavLinks;
