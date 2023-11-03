import fs from 'fs/promises';
import { Metadata, NextPage } from 'next';
import Link from 'next/link';

import { BiLink } from '@react-icons/all-files/bi/BiLink';
import { RiExternalLinkLine } from '@react-icons/all-files/ri/RiExternalLinkLine';

export const metadata: Metadata = {
  title: 'Sitemap | Open Dev Net',
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

const Content: React.FC<BoxProps & { marginLeft: number }> = ({
  layer,
  deep,
  marginLeft,
}) => {
  const rgb = [
    '244,63,94',
    '168,85,247',
    '6,182,212',
    '234,179,8',
    '21,247,76',
  ];

  const lineStyles = [
    'bg-[linear-gradient(90deg,rgb(244,63,94)_0%,rgb(244,63,94)_50%,rgb(244,63,94)_50%,rgba(244,63,94,0.1)_100%)] bg-right',
    'bg-[linear-gradient(90deg,rgb(168,85,247)_0%,rgb(168,85,247)_50%,rgb(168,85,247)_50%,rgba(168,85,247,0.1)_100%)] bg-right',
    'bg-[linear-gradient(90deg,rgb(6,182,212)_0%,rgb(6,182,212)_50%,rgb(6,182,212)_50%,rgba(6,182,212,0.1)_100%)] bg-right',
    'bg-[linear-gradient(90deg,rgb(234,179,8)_0%,rgb(234,179,8)_50%,rgb(234,179,8)_50%,rgba(234,179,8,0.1)_100%)] bg-right',
    'bg-[linear-gradient(90deg,rgb(21,247,76)_0%,rgb(21,247,76)_50%,rgb(21,247,76)_50%,rgba(21,247,76,0.1)_100%)] bg-right',
  ];

  const textStyles = [
    'text-[rgba(244,63,94,0.75)] group-hover:text-[rgb(244,63,94)]',
    'text-[rgba(168,85,247,0.75)] group-hover:text-[rgb(168,85,247)]',
    'text-[rgba(6,182,212,0.75)] group-hover:text-[rgb(6,182,212)]',
    'text-[rgba(234,179,8,0.75)] group-hover:text-[rgb(234,179,8)]',
  ];

  const Icon = layer.path?.startsWith('/app') ? RiExternalLinkLine : BiLink;

  return (
    <>
      <div className="flex">
        {layer.path && (
          <Icon className={`mr-1.5 mt-0.5 h-4 w-4 ${textStyles[deep]}`} />
        )}
        <p className="text-sm font-medium">{layer.name}</p>
      </div>

      {layer.description && (
        <p className="text-text-secondary text-xs">{layer.description}</p>
      )}

      {/* Horizontal line */}
      <div
        className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 transition-all duration-500 hover:duration-300 ${
          layer.path && 'bg-[length:200%] group-hover:bg-left'
        } ${lineStyles[deep]}`}
        style={{
          left: `-${marginLeft}px`,
          width: `${marginLeft}px`,
        }}
      ></div>

      {/* Vertical line */}
      <div
        className="absolute left-0 top-1/2 h-[calc(100%+0.75rem*2+2px)] w-px -translate-y-1/2"
        style={{
          left: `-${marginLeft}px`,
          background: `rgba(${rgb[deep]},0.75)`,
        }}
      ></div>
    </>
  );
};

const Box: React.FC<BoxProps> = ({ layer, deep }) => {
  const marginLeft = 30 + deep * 50;

  /**
   * The first string is the color styles for the box.
   * The second string is the color styles for the hover state.
   */
  const boxStyles: string[][] = [
    [
      'bg-[linear-gradient(90deg,rgba(244,63,94,0.0)_0%,rgba(244,63,94,0.15)_50%,rgba(244,63,94,0.15)_50%,transparent_100%)] shadow-[0_0_10px_0_rgba(244,63,94,0.3)] border-[rgba(244,63,94,0.5)] ring-[rgb(244,63,94)]',
      'hover:shadow-[0_0_10px_2px_rgba(244,63,94,0.75)] hover:border-[rgb(244,63,94)]',
    ],
    [
      'bg-[linear-gradient(90deg,rgba(168,85,247,0.0)_0%,rgba(168,85,247,0.15)_50%,rgba(168,85,247,0.15)_50%,transparent_100%)] shadow-[0_0_10px_0_rgba(168,85,247,0.3)] border-[rgba(168,85,247,0.5)] ring-[rgb(168,85,247)]',
      'hover:shadow-[0_0_10px_2px_rgba(168,85,247,0.75)] hover:border-[rgb(168,85,247)]',
    ],
    [
      'bg-[linear-gradient(90deg,rgba(6,182,212,0.0)_0%,rgba(6,182,212,0.15)_50%,rgba(6,182,212,0.15)_50%,transparent_100%)] shadow-[0_0_10px_0_rgba(6,182,212,0.3)] border-[rgba(6,182,212,0.5)] ring-[rgb(6,182,212)]',
      'hover:shadow-[0_0_10px_2px_rgba(6,182,212,0.75)] hover:border-[rgb(6,182,212)]',
    ],
    [
      'bg-[linear-gradient(90deg,rgba(234,179,8,0.0)_0%,rgba(234,179,8,0.15)_50%,rgba(234,179,8,0.15)_50%,transparent_100%)] shadow-[0_0_10px_0_rgba(234,179,8,0.3)] border-[rgba(234,179,8,0.5)] ring-[rgb(234,179,8)]',
      'hover:shadow-[0_0_10px_2px_rgba(234,179,8,0.75)] hover:border-[rgb(234,179,8)]',
    ],
    [
      'bg-[linear-gradient(90deg,rgba(21,247,76,0.0)_0%,rgba(21,247,76,0.15)_50%,rgba(21,247,76,0.15)_50%,transparent_100%)] shadow-[0_0_10px_0_rgba(21,247,76,0.3)] border-[rgba(21,247,76,0.5)] ring-[rgb(21,247,76)]',
      'hover:shadow-[0_0_10px_2px_rgba(21,247,76,0.75)] hover:border-[rgb(21,247,76)]',
    ],
  ];

  return (
    <div className="relative block">
      {!layer.path ? (
        <div
          className={`group relative my-3 inline-block rounded-lg border bg-[length:200%] bg-left px-4 py-3 ${boxStyles[deep][0]}`}
          style={{
            marginLeft: `${marginLeft}px`,
          }}
        >
          <Content layer={layer} deep={deep} marginLeft={marginLeft} />
        </div>
      ) : layer.path.startsWith('/app') ? (
        <a
          href={layer.path}
          className={`group relative my-3 inline-block rounded-lg border bg-[length:200%] bg-left px-4 py-3 transition-all duration-500 ease-out hover:bg-right hover:duration-200 focus:ring focus:transition-none ${boxStyles[deep][0]} ${boxStyles[deep][1]}`}
          style={{
            marginLeft: `${marginLeft}px`,
          }}
        >
          <Content layer={layer} deep={deep} marginLeft={marginLeft} />
        </a>
      ) : (
        <Link
          href={layer.path}
          className={`group relative my-3 inline-block rounded-lg border bg-[length:200%] bg-left px-4 py-3 transition-all duration-500 ease-out hover:bg-right hover:duration-200 focus:ring focus:transition-none ${boxStyles[deep][0]} ${boxStyles[deep][1]}`}
          style={{
            marginLeft: `${marginLeft}px`,
          }}
        >
          <Content layer={layer} deep={deep} marginLeft={marginLeft} />
        </Link>
      )}

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
    <div className="mx-auto my-10 w-11/12 max-w-5xl rounded-xl bg-black/50">
      <div className="mx-auto max-w-5xl px-16 py-10">
        <div className="text-center">
          <h1 className="text-center text-3xl font-bold">Sitemap</h1>
          <div className="mt-2">
            <Link href="/sitemap/basic" className="link">
              Switch to Basic View
            </Link>
          </div>
        </div>
        <div className="mt-8 columns-1 gap-10 md:columns-2">
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
