'use client';

import { useState } from 'react';
import { IconType } from 'react-icons';

import { FiRadio } from 'react-icons/fi';
import { MdOutlineEvent, MdOutlineFavoriteBorder } from 'react-icons/md';
import { PiBooks } from 'react-icons/pi';

interface DefaultButton {
  id: string;
  label: string;
  icon: IconType;
}

export const Sidebar: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>('feed');

  const defaultButtons: DefaultButton[] = [
    {
      id: 'feed',
      label: 'Feed',
      icon: FiRadio,
    },
    {
      id: 'library',
      label: 'Library',
      icon: PiBooks,
    },
    {
      id: 'events',
      label: 'Events',
      icon: MdOutlineEvent,
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: MdOutlineFavoriteBorder,
    },
  ];

  return (
    <>
      <div className="relative w-56 h-full"></div>

      <div className="fixed w-56 z-50 h-full left-14 top-14 bg-[rgb(var(--sidebar))]">
        <div className="">
          {defaultButtons.map((btn) => (
            <button
              className={`flex w-full px-3 py-4 text-sm font-medium ${
                btn.id === activeButton
                  ? 'text-text bg-secondary-hover'
                  : 'text-text-secondary hover:bg-secondary/50 active:bg-secondary hover:text-text active:text-text'
              }`}
              key={btn.id}
              onClick={() => setActiveButton(btn.id)}
            >
              <btn.icon className="w-5 h-5 mr-3 -mt-px" />
              {btn.label}
            </button>
          ))}

          <div className="w-full h-px mx-auto my-3 bg-text/10"></div>
        </div>
      </div>
    </>
  );
};
