import fs from 'fs/promises';
import { Metadata, NextPage } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sitemap - Basic View | Open Dev Net',
};

interface Layer {
  name: string;
  description?: string;
  path?: string;
  children?: Layer[];
}

interface BoxProps {
  layer: Layer;
  deep: number;
}

const Content: React.FC<{ layer: Layer }> = ({ layer }) => (
  <>
    <span className="absolute left-0 top-2 h-1 w-1 rounded-xl bg-white/50" />
    <p className="text-sm font-medium">{layer.name}</p>
    {layer.description && (
      <p className="text-text-secondary text-xs">{layer.description}</p>
    )}
  </>
);

const Box: React.FC<BoxProps> = ({ layer, deep }) => {
  const marginLeft = deep * 30;

  return (
    <div className="relative block">
      {!layer.path ? (
        <div
          className="relative my-0.5 inline-block px-4"
          style={{
            marginLeft: `${marginLeft}px`,
          }}
        >
          <Content layer={layer} />
        </div>
      ) : layer.path.startsWith('/app') ? (
        <a
          className="link group relative my-0.5 inline-block px-4"
          href={layer.path}
          style={{
            marginLeft: `${marginLeft}px`,
          }}
        >
          <Content layer={layer} />
        </a>
      ) : (
        <Link
          className="link group relative my-0.5 inline-block px-4"
          href={layer.path}
          style={{
            marginLeft: `${marginLeft}px`,
          }}
        >
          <Content layer={layer} />
        </Link>
      )}
      {/* Recursion */}
      {layer.children?.map((child) => (
        <Box deep={deep + 1} key={child.path} layer={child} />
      ))}
    </div>
  );
};

const SitemapBasic: NextPage = async () => {
  const layers = JSON.parse(
    await fs.readFile('./src/app/(site)/sitemap/sitemap.json', 'utf-8')
  ) as Layer[];

  return (
    <div className="mx-auto my-10 w-11/12 max-w-5xl rounded-xl bg-black/50">
      <div className="mx-auto max-w-5xl px-16 py-10">
        <div className="text-center">
          <h1 className="text-center text-3xl font-bold">
            Sitemap - Basic View
          </h1>
          <div className="mt-2">
            <Link className="link" href="/sitemap">
              Switch to Modern View
            </Link>
          </div>
        </div>
        <div className="mt-8 columns-1 gap-10 md:columns-2">
          {layers.map((layer) => (
            <div className="inline-block w-full" key={layer.path}>
              <Box deep={0} layer={layer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitemapBasic;
