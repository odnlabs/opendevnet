import fs from 'fs/promises';
import { Metadata, NextPage } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sitemap | Open Dev Net',
};

interface Layer {
  name: string;
  description?: string;
  path: string;
  children?: Layer[];
}
interface BoxProps {
  layer: Layer;
  deep: number;
}

const Box: React.FC<BoxProps> = ({ layer, deep }) => {
  const marginLeft = 30 + deep * 50;

  const rgb = [
    '244,63,94',
    '168,85,247',
    '6,182,212',
    '234,179,8',
    '21,247,76',
  ];

  const boxStyles = [
    'bg-[linear-gradient(90deg,_rgba(244,63,94,0.0)_0%,_rgba(244,63,94,0.15)_50%,_rgba(244,63,94,0.15)_50%,_transparent_100%)] bg-left hover:bg-right bg-[length:200%] shadow-[0_0_10px_0_rgba(244,63,94,0.3)] hover:shadow-[0_0_10px_0_rgba(244,63,94,0.75)] border-[rgba(244,63,94,0.5)] hover:border-[rgba(244,63,94,1)]',
    'bg-[linear-gradient(90deg,_rgba(168,85,247,0.0)_0%,_rgba(168,85,247,0.15)_50%,_rgba(168,85,247,0.15)_50%,_transparent_100%)] bg-left hover:bg-right bg-[length:200%] shadow-[0_0_10px_0_rgba(168,85,247,0.3)] hover:shadow-[0_0_10px_0_rgba(168,85,247,0.75)] border-[rgba(168,85,247,0.5)] hover:border-[rgba(168,85,247,1)]',
    'bg-[linear-gradient(90deg,_rgba(6,182,212,0.0)_0%,_rgba(6,182,212,0.15)_50%,_rgba(6,182,212,0.15)_50%,_transparent_100%)] bg-left hover:bg-right bg-[length:200%] shadow-[0_0_10px_0_rgba(6,182,212,0.3)] hover:shadow-[0_0_10px_0_rgba(6,182,212,0.75)] border-[rgba(6,182,212,0.5)] hover:border-[rgba(6,182,212,1)]',
    'bg-[linear-gradient(90deg,_rgba(234,179,8,0.0)_0%,_rgba(234,179,8,0.15)_50%,_rgba(234,179,8,0.15)_50%,_transparent_100%)] bg-left hover:bg-right bg-[length:200%] shadow-[0_0_10px_0_rgba(234,179,8,0.3)] hover:shadow-[0_0_10px_0_rgba(234,179,8,0.75)] border-[rgba(234,179,8,0.5)] hover:border-[rgba(234,179,8,1)]',
    'bg-[linear-gradient(90deg,_rgba(21,247,76,0.0)_0%,_rgba(21,247,76,0.15)_50%,_rgba(21,247,76,0.15)_50%,_transparent_100%)] bg-left hover:bg-right bg-[length:200%] shadow-[0_0_10px_0_rgba(21,247,76,0.3)] hover:shadow-[0_0_10px_0_rgba(21,247,76,0.75)] border-[rgba(21,247,76,0.5)] hover:border-[rgba(21,247,76,1)]',
  ];

  const lineStyles = [
    'bg-[linear-gradient(90deg,rgba(244,63,94,1)_0%,rgba(244,63,94,1)_50%,rgba(244,63,94,1)_50%,rgba(244,63,94,0.1)_100%)] bg-right group-hover:bg-left bg-[length:200%]',
    'bg-[linear-gradient(90deg,rgba(168,85,247,1)_0%,rgba(168,85,247,1)_50%,rgba(168,85,247,1)_50%,rgba(168,85,247,0.1)_100%)] bg-right group-hover:bg-left bg-[length:200%]',
    'bg-[linear-gradient(90deg,rgba(6,182,212,1)_0%,rgba(6,182,212,1)_50%,rgba(6,182,212,1)_50%,rgba(6,182,212,0.1)_100%)] bg-right group-hover:bg-left bg-[length:200%]',
    'bg-[linear-gradient(90deg,rgba(234,179,8,1)_0%,rgba(234,179,8,1)_50%,rgba(234,179,8,1)_50%,rgba(234,179,8,0.1)_100%)] bg-right group-hover:bg-left bg-[length:200%]',
    'bg-[linear-gradient(90deg,rgba(21,247,76,1)_0%,rgba(21,247,76,1)_50%,rgba(21,247,76,1)_50%,rgba(21,247,76,0.1)_100%)] bg-right group-hover:bg-left bg-[length:200%]',
  ];

  return (
    <div className="relative block">
      <Link
        href={layer.path}
        className={`group relative inline-block my-3 py-3 px-4 rounded-lg border transition-all duration-500 hover:duration-300 ${boxStyles[deep]}`}
        style={{
          marginLeft: `${marginLeft}px`,
        }}
      >
        <p className="font-medium text-sm">{layer.name}</p>
        {layer.description && (
          <p className="text-xs text-text-secondary">{layer.description}</p>
        )}

        {/* Horizontal line */}
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 h-px w-full transition-all duration-500 hover:duration-300 ${lineStyles[deep]}`}
          style={{
            left: `-${marginLeft}px`,
            width: `${marginLeft}px`,
          }}
        ></div>

        {/* Vertical line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-[calc(100%+0.75rem*2+2px)]"
          style={{
            left: `-${marginLeft}px`,
            background: `rgba(${rgb[deep]},0.75)`,
          }}
        ></div>
      </Link>

      {/* Recursion */}
      {layer.children?.map((child, index) => (
        <Box layer={child} deep={deep + 1} key={index} />
      ))}
    </div>
  );
};

const Sitemap: NextPage = async () => {
  const layers = JSON.parse(
    await fs.readFile('./src/app/(site)/sitemap/sitemap.json', 'utf-8')
  ) as Layer[];

  return (
    <div className="my-10 bg-black/50 rounded-xl max-w-5xl w-11/12 mx-auto">
      <div className="py-10 px-16 max-w-5xl mx-auto">
        <h1 className="font-bold text-3xl text-center">Sitemap</h1>
        <div className="columns-1 md:columns-2 gap-10 mt-10">
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

export default Sitemap;
