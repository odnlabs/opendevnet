'use client';

import { useState } from 'react';
import { IconType } from 'react-icons';

import { HiHome, HiUsers } from 'react-icons/hi';

interface DefaultButton {
  id: string;
  label: string;
  icon: IconType;
}

export const Sidebar: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>('home');

  const defaultButtons: DefaultButton[] = [
    {
      id: 'home',
      label: 'Home',
      icon: HiHome,
    },
    {
      id: 'friends',
      label: 'Friends',
      icon: HiUsers,
    },
  ];

  return (
    <>
      <div className="relative w-56 h-full"></div>

      <div className="fixed w-56 h-full border-r left-16 top-10 bg-sidebar border-border">
        <div className="px-3 pt-3">
          {defaultButtons.map((btn) => (
            <button
              className={`flex w-full px-3 py-3 mt-1 text-sm font-medium transition duration-200 rounded-md ${
                btn.id === activeButton
                  ? 'bg-secondary-hover active:bg-secondary-active'
                  : 'text-text-secondary hover:bg-secondary active:bg-secondary-hover'
              }`}
              key={btn.id}
              onClick={() => setActiveButton(btn.id)}
            >
              <btn.icon className="w-5 h-5 mr-3 -mt-px" />
              {btn.label}
            </button>
          ))}

          <div className="w-full h-px mx-auto my-3 bg-text-button/10"></div>
        </div>
      </div>
    </>
  );
};
