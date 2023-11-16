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
      <div className="mr-3 py-1.5">
        <button className="text-text-secondary flex" type="button">
          <Image
            alt="User Avatar"
            className="h-10 w-10 rounded-full"
            height={100}
            src={`/app${defaultAvatar}`}
            width={100}
          />
          <span className="ml-2.5 mr-1.5 py-2 font-medium">
            {user.username}
          </span>
          <HiChevronDown className="my-2.5 h-5 w-5" />
        </button>
      </div>
    )
  );
};
