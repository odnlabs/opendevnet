import Image from 'next/image';
import Link from 'next/link';

interface Link {
  label: string;
  href: string;
}

const links: { title: string; items: Link[] }[] = [
  {
    title: 'Website',
    items: [
      { label: 'Homepage', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Login', href: '/login' },
      { label: 'Register', href: '/register' },
    ],
  },
  {
    title: 'About Us',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Story', href: '/about' },
      { label: 'Vision', href: '/about/vision' },
      { label: 'Team', href: '/about/team' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'Feedback', href: '/feedback' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Policies',
    items: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Community Guidelines', href: '/guidelines' },
      { label: 'Licenses', href: '/licenses' },
    ],
  },
];

export const Footer: React.FC = () => (
  <>
    <div className="py-5 border-t border-border bg-[rgb(var(--footer))] text-sm">
      <div className="max-w-5xl py-10 mx-auto w-11/12 flex justify-between">
        <div className="w-80">
          <Image
            height={50}
            width={50}
            src="/logo.png"
            alt="Footer Logo"
            className=""
          />
          <p className="mt-4 font-medium text-xl text-text-primary">
            Open Dev Net
          </p>
        </div>
        <div className="flex justify-between">
          {links.map((category, index) => (
            <div className="mx-10 flex-grow w-full" key={index}>
              <p className="mb-4 font-semibold uppercase text-sm">
                {category.title}
              </p>
              {category.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href}
                  className="block my-2 text-text-faint hover:text-text-primary hover:underline active:text-text active:underline"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="py-5 border-t border-border bg-[rgb(var(--footer))] text-sm">
      <p className="text-center text-sm text-text-faint">
        © {new Date().getFullYear()},{' '}
        <Link href="/" className="hover:underline">
          OpenDevNet.com
        </Link>
      </p>
    </div>
  </>
);
