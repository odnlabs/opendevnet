'use client';

import React, { useEffect, useState } from 'react';

import { HiCheckCircle } from 'react-icons/hi';
import { IoWarning } from 'react-icons/io5';
import { MdClose, MdError, MdInfo } from 'react-icons/md';

import { IToast, ToastType } from '../../typings/core';

const typeBorder = {
  [ToastType.Info]: 'border-blue-400/20',
  [ToastType.Success]: 'border-green-400/20',
  [ToastType.Warning]: 'border-orange-400/20',
  [ToastType.Error]: 'border-red-400/20',
};

const typeBackground = {
  [ToastType.Info]: 'bg-blue-400/10',
  [ToastType.Success]: 'bg-green-400/10',
  [ToastType.Warning]: 'bg-orange-400/10',
  [ToastType.Error]: 'bg-red-400/10',
};

const typeIcon = {
  [ToastType.Info]: <MdInfo className="w-6 h-6 text-blue-400" />,
  [ToastType.Success]: <HiCheckCircle className="w-6 h-6 text-green-400" />,
  [ToastType.Warning]: <IoWarning className="w-6 h-6 text-orange-400" />,
  [ToastType.Error]: <MdError className="w-6 h-6 text-red-400" />,
};

interface Props {
  toast: IToast;
  removeToast: (id: string) => void;
}

export const Toast: React.FC<Props> = ({ toast, removeToast }) => {
  const [visible, setVisible] = useState<boolean>(true);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      if (toast.id) removeToast(toast.id);
    }, 500);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, toast.time ?? 1000 * 60);
    return () => clearTimeout(timer);
  });

  return (
    <div
      className={`max-w-80 border-border relative grid rounded-lg bg-gray-900 shadow-lg transition-all duration-500 ${
        visible
          ? `mb-2 animate-[toast-enter_500ms_ease] grid-rows-[1fr] border ${
              typeBorder[toast.type]
            }`
          : 'translate-x-full grid-rows-[0fr] opacity-0'
      }`}
    >
      <div
        className="overflow-hidden transition-all duration-500"
        id={toast.id}
      >
        {/* Header */}
        <div
          className={`flex h-10 justify-between border-b p-1 ${
            typeBorder[toast.type]
          }`}
        >
          <div className="flex p-1">
            {/* Icon */}
            <div className="mr-1">{typeIcon[toast.type]}</div>

            {/* Title */}
            <p className="my-0.5 text-sm font-bold">{toast.title}</p>
          </div>

          {/* Close Button */}
          <button
            className="rounded-3xl p-1.5 text-gray-300 hover:text-white"
            onClick={handleClose}
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {toast.description && (
          <div
            className={`px-4 pb-4 pt-3 rounded-b-lg ${
              typeBackground[toast.type]
            }`}
          >
            <p className="mt-0.5 text-sm leading-4 text-gray-300">
              {toast.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
