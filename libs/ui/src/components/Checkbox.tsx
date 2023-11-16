'use client';

import React from 'react';

import { FaCheck } from '@react-icons/all-files/fa/FaCheck';

interface CheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly checked: boolean;
  readonly setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  readonly className?: string;
  readonly disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  setChecked,
  disabled,
  ...props
}) => (
  <div
    className={`min-h-5 min-w-5 max-w-5 max-h-5 cursor-default rounded-sm border transition duration-200 ${
      checked
        ? 'border-primary bg-primary'
        : `border-border bg-[rgb(var(--input))] ${
            !disabled &&
            'hover:border-primary hover:bg-[rgb(var(--input-focus))] hover:transition-none'
          }`
    } ${props.className}`}
    onClick={() => setChecked(!checked)}
  >
    <FaCheck
      className={`text-text-button m-0.5 h-3 w-3 translate-x-px translate-y-px transition-[opacity,visibility] duration-200 ${
        !checked && 'invisible opacity-0'
      }`}
    />
  </div>
);
