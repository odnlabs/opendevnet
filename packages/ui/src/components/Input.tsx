import React from 'react';

import { RiSearchLine } from '@react-icons/all-files/ri/RiSearchLine';

enum IconOptions {
  Search = 'search',
}

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  icon?: IconOptions | React.ComponentType;
}

export const Input: React.FC<InputProps> = ({
  label,
  size = 'md',
  icon,
  ...props
}) => {
  const Icon = icon === IconOptions.Search ? RiSearchLine : undefined;

  const sizeStyles = {
    sm: `py-1 pr-2 ${Icon ? 'pl-8' : 'pl-2'}`,
    md: `py-2 pr-3 ${Icon ? 'pl-10' : 'pl-3'}`,
    lg: `py-4 pr-5 ${Icon ? 'pl-12' : 'pl-5'}`,
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={props.id}
          className="inline-block text-sm text-text-primary font-medium mb-2 ml-1"
        >
          {label}
          {props.required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary ${
              size === 'sm' ? 'left-2' : size === 'md' ? 'left-3' : 'left-4'
            }`}
          />
        )}

        <input
          {...props}
          className={`block w-full rounded-md bg-[rgb(var(--input))] focus:bg-[rgb(var(--input-focus))] transition duration-200 placeholder:text-sm border-2 border-transparent focus:border-primary ${sizeStyles[size]} ${props.className}`}
          size={20} // Use the default value because size is used as a custom prop
        />
      </div>
    </div>
  );
};
