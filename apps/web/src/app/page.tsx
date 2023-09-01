import { Button } from '@components';

export const metadata = {
  title: 'App | Open Dev Net',
};

export default function Page() {
  return (
    <>
      <div className="w-full h-full p-10">
        <div className="p-12 text-white rounded-lg bg-gradient-to-r from-blue-800 to-rose-500">
          <p className="text-4xl font-bold">Welcome Home, User.</p>
          <p className="mt-2 text-lg text-white/75">
            Manage your friends, direct messages, and bookmarks here.
          </p>
        </div>
      </div>
    </>
  );
}
