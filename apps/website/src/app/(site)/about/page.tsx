import { Metadata, NextPage } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About | Open Dev Net',
};

const About: NextPage = () => {
  const paragraphStyle = 'my-3 text-text-primary font-';
  const headerStyle = 'mt-10 text-2xl font-semibold';
  const subheaderStyle = 'mt-8 text-xl font-medium';

  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="text-center text-3xl font-semibold">About Us</h1>
      <div className="mt-5">
        <p className={paragraphStyle}>
          Hey! We&apos;re the team behind Open Dev Net, a group of developers
          passionate about developing open-source software and building a
          community of developers. Thus, we decided to create Open Dev Net, a
          social platform for developers to collaborate, find new opportunities,
          and streamline workflows.
        </p>
        <Image
          alt="About"
          className="mt-5 max-h-80 rounded-lg object-cover"
          height={800}
          src="/about/about.jpg"
          width={1200}
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
          If you&apos;re interested in contributing to the project, check out
          our{' '}
          <a
            className="link"
            href="https://opendevnet.com/internal-docs/contributing/contributing"
            rel="noopener noreferrer"
            target="_blank"
          >
            Contributing Guidelines
          </a>
          . If you&apos;re interested in officially joining the team, email at{' '}
          <a
            className="link"
            href="mailto:slekupvimplyrataqq@protonmail.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            slekupvimplyrataqq@protonmail.com
          </a>
          .
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
            className="link"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            rel="noopener noreferrer"
            target="_blank"
          >
            CC BY-NC-SA 4.0
          </a>
          , meaning you can use, modify, and distribute the code for
          non-commercial purposes with attribution.
        </p>
      </div>
    </div>
  );
};

export default About;
