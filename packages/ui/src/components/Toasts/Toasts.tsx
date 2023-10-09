'use client';

import React from 'react';

import { IToast } from '../../typings/core';
import { Toast } from './Toast';

interface Props {
  toasts: IToast[];
  removeToast: (id: string) => void;
}

export const Toasts: React.FC<Props> = ({ toasts, removeToast }) => (
  <>
    <div className="fixed right-2 top-2 z-[100]">
      {toasts.map((toast) => (
        <Toast toast={toast} key={toast.id} removeToast={removeToast} />
      ))}
    </div>
  </>
);
