import { IconType } from '@react-icons/all-files';
import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly label: string;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly variant?:
    | 'primary'
    | 'primary-outline'
    | 'primary-glass'
    | 'secondary'
    | 'secondary-outline'
    | 'secondary-glass'
    | 'danger'
    | 'danger-outline'
    | 'danger-glass'
    | 'warning'
    | 'warning-outline'
    | 'warning-glass'
    | 'success'
    | 'success-glass'
    | 'success-outline';
  readonly width?: 'auto' | 'full';
  readonly outline?: boolean;
  readonly link?: boolean;
  readonly iconLeft?: IconType;
  readonly iconRight?: IconType;
  readonly iconRotate?: number;
}

const ButtonIcon: React.FC<{
  readonly icon: IconType;
  readonly side: 'left' | 'right';
  readonly iconRotate?: number | undefined;
}> = ({ icon: Icon, side, iconRotate }) => {
  return (
    <Icon
      className={`transiton -mb-0.5 mt-0.5 h-5 w-5 duration-300 ${
        side === 'left' ? 'mr-1' : side === 'right' ? 'ml-1' : ''
      }`}
      style={{
        transform: `rotate(${iconRotate ?? 0}deg)`,
      }}
    />
  );
};

export const Button = ({
  label,
  size = 'md',
  variant = 'primary',
  width = 'auto',
  link = false,
  iconLeft,
  iconRight,
  iconRotate,
  ...props
}: ButtonProps): JSX.Element => {
  const sizeStyle = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-5 py-2 text-sm',
    lg: 'px-7 py-3 text-sm',
  };

  const variantStyle = {
    'primary':
      'bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-text',
    'primary-outline':
      'bg-transparent hover:bg-primary/20 active:bg-primary/50 text-primary-text border-primary',
    'primary-glass':
      'bg-primary-glass/10 hover:bg-primary-glass/20 active:bg-primary-glass/40 text-primary-glass',
    'secondary':
      'bg-secondary hover:bg-secondary-hover active:bg-secondary-active text-secondary-text',
    'secondary-outline':
      'bg-transparent hover:bg-secondary/20 active:bg-secondary/50 text-secondary-text border-secondary',
    'secondary-glass':
      'bg-secondary-glass/10 hover:bg-secondary-glass/20 active:bg-secondary-glass/40 text-secondary-glass',
    'danger':
      'bg-danger hover:bg-danger-hover active:bg-danger-active text-danger-text',
    'danger-outline':
      'bg-transparent hover:bg-danger-hover active:bg-danger-active text-danger-text border-danger',
    'danger-glass':
      'bg-danger-glass/10 hover:bg-danger-glass/20 active:bg-danger-glass/40 text-danger-glass',
    'warning':
      'bg-warning hover:bg-warning-hover active:bg-warning-active text-warning-text',
    'warning-outline':
      'bg-transparent hover:bg-warning-hover active:bg-warning-active text-warning-text border-warning',
    'warning-glass':
      'bg-warning-glass/10 hover:bg-warning-glass/20 active:bg-warning-glass/40 text-warning-glass',
    'success':
      'bg-success hover:bg-success-hover active:bg-success-active text-success-text',
    'success-outline':
      'bg-transparent hover:bg-success-hover active:bg-success-active text-success-text border-success',
    'success-glass':
      'bg-success-glass/10 hover:bg-success-glass/20 active:bg-success-glass/40 text-success-glass',
  };

  return link ? (
    <p
      className={`flex rounded-sm transition duration-200 group-focus-visible:ring group-focus-visible:transition-none ${
        sizeStyle[size]
      } ${variantStyle[`${variant}`]} ${
        variant.endsWith('-outline') && 'border'
      } ${width === 'full' && 'w-full'}`}
      {...(props as React.HTMLAttributes<HTMLParagraphElement>)}
    >
      {iconLeft && <ButtonIcon icon={iconLeft} side="left" />}
      {label}
      {iconRight && <ButtonIcon icon={iconRight} side="right" />}
    </p>
  ) : (
    <button
      type="button"
      {...props}
      className={`flex rounded-sm transition duration-200 focus-visible:ring focus-visible:transition-none ${
        sizeStyle[size]
      } ${variantStyle[`${variant}`]} ${
        variant.endsWith('-outline') && 'border'
      } ${width === 'full' && 'w-full'}`}
    >
      {iconLeft && (
        <ButtonIcon icon={iconLeft} iconRotate={iconRotate} side="left" />
      )}
      {label}
      {iconRight && (
        <ButtonIcon icon={iconRight} iconRotate={iconRotate} side="right" />
      )}
    </button>
  );
};
