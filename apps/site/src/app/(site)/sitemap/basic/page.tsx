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
    <span className="h-1 w-1 rounded-xl bg-white/50 absolute top-2 left-0"></span>
    <p className="font-medium text-sm">{layer.name}</p>

    {layer.description && (
      <p className="text-xs text-text-secondary">{layer.description}</p>
    )}
  </>
);

const Box: React.FC<BoxProps> = ({ layer, deep }) => {
  const marginLeft = deep * 30;

  return (
    <div className="relative block">
      {!layer.path ? (
        <div
          className="relative inline-block my-0.5 px-4"
          style={{
            marginLeft: `${marginLeft}px`,
          }}
        >
          <Content layer={layer} />
        </div>
      ) : layer.path.startsWith('/app') ? (
        <a
          href={layer.path}
          className="group relative inline-block my-0.5 px-4 link"
          style={{
            marginLeft: `${marginLeft}px`,
          }}
        >
          <Content layer={layer} />
        </a>
      ) : (
        <Link
          href={layer.path}
          className="group relative inline-block my-0.5 px-4 link"
          style={{
            marginLeft: `${marginLeft}px`,
          }}
        >
          <Content layer={layer} />
        </Link>
      )}

      {/* Recursion */}
      {layer.children?.map((child, index) => (
        <Box layer={child} deep={deep + 1} key={index} />
      ))}
    </div>
  );
};

const SitemapBasic: NextPage = async () => {
  const layers = JSON.parse(
    await fs.readFile('./src/app/(site)/sitemap/sitemap.json', 'utf-8')
  ) as Layer[];

  return (
    <div className="my-10 bg-black/50 rounded-xl max-w-5xl w-11/12 mx-auto">
      <div className="py-10 px-16 max-w-5xl mx-auto">
        <div className="text-center">
          <h1 className="font-bold text-3xl text-center">
            Sitemap - Basic View
          </h1>
          <div className="mt-2">
            <Link href="/sitemap" className="link">
              Switch to Modern View
            </Link>
          </div>
        </div>
        <div className="columns-1 md:columns-2 gap-10 mt-8">
          {layers.map((layer, index) => (
            <div key={index} className="inline-block w-full">
              <Box layer={layer} deep={0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitemapBasic;
