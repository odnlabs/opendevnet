import Image from 'next/image';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <>
      <div className="relative h-16 w-full"></div>

      <div className="fixed h-16 w-screen top-0 left-0 bg-[rgb(var(--header))] border-b border-border backdrop-blur-lg">
        <div className="flex max-w-7xl w-11/12 mx-auto">
          {/* Branding */}
          <div className="flex p-1.5">
            <Image
              src="/logo.png"
              height={100}
              width={100}
              alt="Logo"
              className="w-11 h-11 mr-1 rounded-full"
            />
            <p className="font-bold text-xl text-text-secondary my-2 ml-2">
              Open Dev Net
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
