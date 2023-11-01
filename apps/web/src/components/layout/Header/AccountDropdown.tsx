'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';

import { HiChevronDown } from '@react-icons/all-files/hi/HiChevronDown';

import { userState } from '@store';

interface AccountDropdownProps {
  defaultAvatar: string;
}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({
  defaultAvatar,
}) => {
  const user = useSelector(userState);

  return (
    user && (
      <div className="py-1.5 mr-3">
        <button className="flex text-text-secondary">
          <Image
            src={`/app${defaultAvatar}`}
            alt="User Avatar"
            height={100}
            width={100}
            className="h-10 w-10 rounded-full"
          />
          <span className="ml-2.5 mr-1.5 py-2 font-medium">
            {user.username}
          </span>
          <HiChevronDown className="h-5 w-5 my-2.5" />
        </button>
      </div>
    )
  );
};
