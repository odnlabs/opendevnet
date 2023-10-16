import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => (
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
    <input
      {...props}
      className="block w-full px-3 py-2 rounded-md bg-[rgb(var(--input))] focus:bg-[rgb(var(--input-focus))] transition duration-200 placeholder:text-sm border-2 border-transparent focus:border-primary"
    />
  </div>
);
