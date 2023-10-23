import { Metadata, NextPage } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sitemap | Open Dev Net',
};

const Sitemap: NextPage = () => {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'About', path: '/about' },
    { name: 'App', path: '/app' },
  ];

  return (
    <div className="py-20 max-w-7xl w-11/12 mx-auto">
      {pages.map((page, index) => (
        <div key={index}>
          <Link href={page.path} className="link">
            Link: {page.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sitemap;
