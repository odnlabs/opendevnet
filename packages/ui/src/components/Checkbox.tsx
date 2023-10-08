'use client';

import React from 'react';

import { FaCheck } from 'react-icons/fa';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  setChecked,
  className,
  disabled,
}) => {
  return (
    <div
      className={`min-h-5 min-w-5 max-h-5 max-w-5 cursor-default rounded-sm border transition duration-200 ${
        checked
          ? 'border-primary bg-primary'
          : `border-border bg-[rgb(var(--input))] ${
              !disabled &&
              'hover:border-primary hover:bg-[rgb(var(--input-focus))] hover:transition-none'
            }`
      } ${className && className}`}
      onClick={() => setChecked(!checked)}
    >
      <FaCheck
        className={`m-0.5 translate-x-px translate-y-px h-3 w-3 text-text-button transition-[opacity,visibility] duration-200 ${
          !checked && 'invisible opacity-0'
        }`}
      />
    </div>
  );
};
