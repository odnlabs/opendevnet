import React from 'react';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly label?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => (
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
    <textarea
      {...props}
      className={`focus:border-primary block w-full rounded-md border-2 border-transparent bg-[rgb(var(--input))] px-3 py-2 transition duration-200 placeholder:text-sm focus:bg-[rgb(var(--input-focus))] ${props.className}`}
    />
  </div>
);
