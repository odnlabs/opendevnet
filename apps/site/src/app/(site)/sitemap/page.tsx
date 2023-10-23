import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap | Open Dev Net',
};

const Sitemap: NextPage = () => {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'App', path: '/app' },
  ];

  return (
    <div className="py-20 max-w-7xl w-11/12 mx-auto">
      {pages.map((page, index) => (
        <div key={index}>
          <a href={page.path} className="link">
            Link: {page.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Sitemap;
