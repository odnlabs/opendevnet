import Link from 'next/link';

export const Footer: React.FC = () => (
  <div className="py-8 border-t border-border bg-[rgb(var(--footer))] text-sm">
    <p className="text-center text-sm text-text-faint">
      &copy; {new Date().getFullYear()},{' '}
      <Link href="/" className="hover:text-text">
        OpenDevNet.com
      </Link>
    </p>
  </div>
);
