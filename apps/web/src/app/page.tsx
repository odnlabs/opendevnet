import { Button } from '@components';
import config from '@config';

export const metadata = {
  title: 'Feed | Open Dev Net',
};

const events = [
  {
    title: 'ODN Hackathon #52',
    date: 'October 14, 9:00am EST',
    type: 'Community Event',
    by: 'Open Dev Net',
    icon: config.defaultAvatar,
    upcoming: true,
  },
  {
    title: "ODN's 1st Birthday",
    date: 'October 14, 9:00am EST',
    type: 'Community Event',
    by: 'Open Dev Net',
    icon: config.defaultAvatar,
    upcoming: true,
  },
  {
    title: 'ODN Hackathon #51',
    date: 'October 13, 9:00am EST',
    type: 'Community Event',
    by: 'Open Dev Net',
    icon: config.defaultAvatar,
  },
  {
    title: 'ODN Hackathon #50',
    date: 'October 12, 9:00am EST',
    type: 'Community Event',
    by: 'Open Dev Net',
    icon: config.defaultAvatar,
  },
  {
    title: 'ODN Hackathon #49',
    date: 'October 11, 9:00am EST',
    type: 'Community Event',
    by: 'Open Dev Net',
    icon: config.defaultAvatar,
  },
  {
    title: 'ODN Hackathon #48',
    date: 'October 10, 9:00am EST',
    type: 'Community Event',
    by: 'Open Dev Net',
    icon: config.defaultAvatar,
  },
  {
    title: 'ODN Hackathon #47',
    date: 'October 9, 9:00am EST',
    type: 'Community Event',
    by: 'Open Dev Net',
    icon: config.defaultAvatar,
  },
];

const posts = [
  {
    author: {
      icon: config.defaultAvatar,
      name: 'John Doe',
      position: 'Software Engineer',
    },
    color: '#FDE68A',
    title: 'How to build a blockchain',
  },
  {
    author: {
      icon: config.defaultAvatar,
      name: 'Sally Mands',
      position: 'Backend Developer',
    },
    color: '#8194FC',
    title: 'How to deploy a blockchain',
  },
  {
    author: {
      icon: config.defaultAvatar,
      name: 'John Doey',
      position: 'Frontend Engineer',
    },
    color: '#FC9481',
    title: 'How to develop a blockchain UI',
  },
];

const featuredNetworks = [
  {
    name: 'Open Dev Net',
    icon: config.defaultAvatar,
    members: 100000,
  },
  {
    name: 'Google',
    icon: config.defaultAvatar,
    members: 85000,
  },
  {
    name: 'Facebook',
    icon: config.defaultAvatar,
    members: 75000,
  },
  {
    name: 'Microsoft',
    icon: config.defaultAvatar,
    members: 65000,
  },
  {
    name: 'Apple',
    icon: config.defaultAvatar,
    members: 55000,
  },
  {
    name: 'Amazon',
    icon: config.defaultAvatar,
    members: 45000,
  },
  {
    name: 'Twitter (X)',
    icon: config.defaultAvatar,
    members: 35000,
  },
  {
    name: 'Netflix',
    icon: config.defaultAvatar,
    members: 25000,
  },
];

export default function Page() {
  return (
    <>
      <div className="max-w-8xl w-11/12 mx-auto my-10 flex">
        <div className="w-1/3 pr-5">
          <div className="">
            <p className="text-3xl font-medium">Events</p>
            <div className="mt-5">
              {events.map((event, index) => (
                <div
                  className="mt-5 flex bg-background-secondary rounded-lg p-8"
                  key={index}
                >
                  <div className="w-20">
                    <img
                      src={event.icon}
                      alt="Event Icon"
                      className="h-12 w-12 rounded-full"
                    />
                  </div>
                  <div className="">
                    <p className="text-lg font-bold text-text">{event.title}</p>
                    <p className="text-sm text-text-secondary">{event.date}</p>
                    <p className="text-sm text-text-faint">{event.type}</p>
                    <p className="text-sm text-text-faint">by {event.by}</p>
                    <div className="mt-3">
                      <Button
                        title={event.upcoming ? 'Join' : 'Upcoming'}
                        variant={event.upcoming ? 'primary' : 'secondary'}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/3 px-5">
          <div className="">
            <p className="text-3xl font-medium">What's new</p>
            <div className="mt-5">
              {posts.map((post, index) => (
                <div className="mt-8" key={index}>
                  <div className="flex">
                    <div className="w-16">
                      <img
                        src={post.author.icon}
                        alt="Event Icon"
                        className="h-12 w-12 rounded-full"
                      />
                    </div>
                    <div className="ml-1">
                      <p className="text-lg font-bold text-text">
                        {post.author.name}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {post.author.position}
                      </p>
                    </div>
                  </div>
                  <div className="bg-background-secondary rounded-lg mt-3">
                    <div
                      className="h-40 rounded-lg"
                      style={{ background: post.color }}
                    >
                      {/* <img
                        src={config.defaultAvatar}
                        alt="Event Icon"
                        className="h-full w-full object-cover rounded-t-lg"
                      /> */}
                    </div>
                    <div className="p-5">
                      <p className="text-lg font-bold text-text">
                        {post.title}
                      </p>
                      <div className="mt-3">
                        <Button label="Read More" variant="secondary" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/3 pl-5">
          <div className="">
            <p className="text-3xl font-medium">Featured Networks</p>
            <div className="mt-5">
              {featuredNetworks.map((network, index) => (
                <div
                  className="mt-5 flex bg-background-secondary rounded-lg p-5"
                  key={index}
                >
                  <div className="w-20">
                    <img
                      src={network.icon}
                      alt="Event Icon"
                      className="h-12 w-12 rounded-full"
                    />
                  </div>
                  <div className="">
                    <p className="text-lg font-bold text-text">
                      {network.name}
                    </p>
                    <p className="text-lg text-text-secondary">
                      {network.members.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
