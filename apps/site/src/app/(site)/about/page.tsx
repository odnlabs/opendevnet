import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About | Open Dev Net',
};

export default function About() {
  const paragraphStyle = 'my-3 text-text-primary font-';
  const headerStyle = 'mt-10 text-2xl font-semibold';
  const subheaderStyle = 'mt-8 text-xl font-medium';

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-semibold text-center">About Us</h1>

      <div className="mt-5">
        <p className={paragraphStyle}>
          Hey! We're the team behind Open Dev Net, a group of developers
          passionate about developing open-source software and building a
          community of developers. Thus, we decided to create Open Dev Net, a
          social platform for developers to collaborate, find new opportunities,
          and streamline workflows.
        </p>
        <Image
          src="/about/about.jpg"
          alt="About"
          height={800}
          width={1200}
          className="object-cover max-h-80 rounded-lg mt-5"
        />
        <h2 className={subheaderStyle}>The Problem</h2>
        <p className={paragraphStyle}>
          Currently, platforms exist for developers to connect, but they are
          typically closed-source and proprietary. Being closed-source means the
          code is not available for the public to view, which is a problem
          because the community cannot audit the platform; therefore, it can
          lack empirical privacy, security, and overall trust of the community.
          It also means that the platform cannot be self-hosted or modified.
        </p>
        <h2 className={subheaderStyle}>The Solution</h2>
        <p className={paragraphStyle}>
          We plan to solve this problem by creating an open-source,
          privacy-oriented, secure, and trustworthy platform for developers. As
          the platform is specifically designed for developers, it includes new
          features not currently implemented on other social platforms. At the
          same time, we are also building a community of developers to help
          build and improve the platform.
        </p>
        <h1 className={headerStyle}>Technical Details</h1>
        <h2 className={subheaderStyle}>Open Source</h2>
        <p className={paragraphStyle}>
          As mentioned above, Open Dev Net is open-source, meaning the app is
          open for the public to view and audit. This also means that the app is
          free to use and modify. We believe that open-source is the future of
          software development and want to be a part of that future.
        </p>
        <p className={paragraphStyle}>
          If you're interested in contributing to the project, check out our{' '}
          <a
            href="https://github.com/open-dev-net/.github/blob/main/CONTRIBUTING.md/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Contributing Guidelines
          </a>
          . If you're interested in officially joining the team, DM Slekup on
          Discord at <b className="font-bold">@slekup</b> or email at{' '}
          <a
            href="mailto:slekupvimplyrataqq@protonmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            slekupvimplyrataqq@protonmail.com
          </a>
          . (I check Discord more often).
        </p>
        <h2 className={subheaderStyle}>Technology Stack</h2>
        <p className={paragraphStyle}>
          Open Dev Net is built with the MERN stack: MongoDB, Express, React
          (Next.js), and Node.js. We chose this stack because it is very
          popular, flexible, scalable, and familiar to many web developers. Some
          auxiliary technologies include TypeScript, TailwindCSS, and Redux.
          This stack is bound to change as we continue to develop the platform.
        </p>
        <h2 className={subheaderStyle}>License</h2>
        <p className={paragraphStyle}>
          Open Dev Net and most of its related code is licensed under{' '}
          <a
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            CC BY-NC-SA 4.0
          </a>
          , meaning you can use, modify, and distribute the code for
          non-commercial purposes with attribution.
        </p>
      </div>
    </div>
  );
}
