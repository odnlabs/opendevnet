import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const Button = ({ title, ...props }: ButtonProps) => {
  return (
    <button
      className="px-5 py-2 rounded-md bg-primary text-text-button"
      {...props}
    >
      {title}
    </button>
  );
};
