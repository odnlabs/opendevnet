'use client';

import React from 'react';

import { IToast } from '../../typings/core';
import { Toast } from './Toast';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly toasts: IToast[];
  readonly removeToast: (id: string) => void;
}

export const Toasts: React.FC<Props> = ({ toasts, removeToast, ...props }) => (
  <div {...props} className={`fixed right-2 top-2 z-[100] ${props.className}`}>
    {toasts.map((toast) => (
      <Toast key={toast.id} removeToast={removeToast} toast={toast} />
    ))}
  </div>
);
