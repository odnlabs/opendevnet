import { Metadata, NextPage } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Vision | Open Dev Net',
};

const Vision: NextPage = () => {
  const paragraphStyle = 'my-3 text-text-primary font-light';
  const headerStyle = 'mt-8 text-2xl font-semibold';
  // const subheaderStyle = 'mt-5 text-xl font-medium';

  // TODO: Rewrite the content for this page
  // ! Will be rewritten
  // ! The following text is AI-generated placeholder text

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-semibold text-center">Vision</h1>
      <div className="mt-5">
        <p className={paragraphStyle}>
          Welcome to the heart of Open Dev Net, where we unveil our grand vision
          for the future of developer collaboration and innovation. Our journey
          began with a simple yet powerful idea: to create a digital haven where
          developers can connect, collaborate, and catalyze change in the world
          of technology.
        </p>
        <Image
          src="/about/vision.jpg"
          alt="About"
          height={800}
          width={1200}
          className="object-cover max-h-80 rounded-lg mt-5"
        />
        <h2 className={headerStyle}>
          Connecting Developers, Creators, and Innovators
        </h2>
        <p className={paragraphStyle}>
          Imagine a place where developers seamlessly connect with other
          like-minded individuals, clients seeking technical expertise, and
          innovators with groundbreaking ideas. Open Dev Net is on a mission to
          become the mainstream conduit for these connections, bridging the gap
          between talent and opportunity.
        </p>
        <h2 className={headerStyle}>The Digital Silicon Valley</h2>
        <p className={paragraphStyle}>
          We aspire to be more than just a platform; we aim to be a digital
          Silicon Valley. A place where innovation thrives, ideas flourish, and
          groundbreaking projects come to life. Open Dev Net is your virtual
          playground for turning dreams into reality.
        </p>
        <h2 className={headerStyle}>Streamlining Developer Workflows</h2>
        <p className={paragraphStyle}>
          Efficiency is at the core of our vision. We&apos;re committed to
          simplifying the lives of developers by streamlining workflows,
          providing tools and features tailored to their needs, and fostering an
          environment where productivity knows no bounds.
        </p>
        <h2 className={headerStyle}>The Open-Source Advantage</h2>
        <p className={paragraphStyle}>
          Central to our vision is the philosophy of open-source. We firmly
          believe that transparency and collaboration are the keys to a brighter
          technological future. Open Dev Net is proudly open-source, ensuring
          that our platform is not only trustworthy but also community-driven
          and adaptable.
        </p>
        <h2 className={headerStyle}>Our Community, Our Strength</h2>
        <p className={paragraphStyle}>
          As we pursue our vision, we understand that the strength of Open Dev
          Net lies in its community. We invite developers, enthusiasts, and
          visionaries from all corners of the globe to join us on this exciting
          journey. Together, we will shape the future of developer
          collaboration.
        </p>
        <h2 className={headerStyle}>Join Us in Shaping the Future</h2>
        <p className={paragraphStyle}>
          Our vision is ambitious, but it&apos;s a vision worth chasing. Join us
          in making it a reality. Whether you&apos;re a developer looking for
          opportunities, a client seeking expertise, or an innovator with a
          groundbreaking idea, Open Dev Net is here to empower you.
        </p>
        <p className={paragraphStyle}>
          Together, we&apos;ll create a digital world where innovation knows no
          bounds, where connections flourish, and where developers like you lead
          the way. Welcome to the future of developer collaboration. Welcome to
          Open Dev Net.
        </p>
      </div>
    </div>
  );
};

export default Vision;
