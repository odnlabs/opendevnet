'use client';

import React from 'react';

import { ButtonProps, ToastType, Button as UIButton } from '@odnlabs/ui';
import { addToast } from '@slices/toasts.slice';
import { useDispatch } from 'react-redux';

export const Button: React.FC<ButtonProps> = (props) => {
  const dispatch = useDispatch();

  return (
    <UIButton
      onClick={() =>
        dispatch(
          addToast({
            title: 'Hello',
            message: 'World',
            type: ToastType.Success,
            duration: 5000,
          })
        )
      }
      {...props}
    />
  );
};
