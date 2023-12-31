import React from 'react';

import { RiSearchLine } from '@react-icons/all-files/ri/RiSearchLine';

enum IconOptions {
  Search = 'search',
}

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  readonly size?: 'sm' | 'md' | 'lg';
  readonly label?: string;
  readonly icon?: `${IconOptions}`;
}

export const Input: React.FC<InputProps> = ({
  label,
  size = 'md',
  icon,
  ...props
}) => {
  const icons = {
    search: RiSearchLine,
  };

  const Icon = icon ? icons[icon] : undefined;

  const sizeStyles = {
    sm: `py-1 pr-2 ${Icon ? 'pl-8' : 'pl-2'}`,
    md: `py-2 pr-3 ${Icon ? 'pl-10' : 'pl-3'}`,
    lg: `py-4 pr-5 ${Icon ? 'pl-12' : 'pl-5'}`,
  };

  return (
    <div>
      {label && (
        <label
          className="text-text-primary mb-2 ml-1 inline-block text-sm font-medium"
          htmlFor={props.id}
        >
          {label}
          {props.required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            className={`text-text-secondary absolute top-1/2 h-5 w-5 -translate-y-1/2 ${
              size === 'sm' ? 'left-2' : size === 'md' ? 'left-3' : 'left-4'
            }`}
          />
        )}
        <input
          {...props}
          className={`focus:border-primary block w-full rounded-md border-2 border-transparent bg-[rgb(var(--input))] transition duration-200 placeholder:text-sm focus:bg-[rgb(var(--input-focus))] focus-visible:transition-none ${sizeStyles[size]} ${props.className}`}
          size={20} // Use the default value because size is used as a custom prop
        />
      </div>
    </div>
  );
};
