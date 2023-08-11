'use client';

import { Toasts } from '@odnlabs/ui';
import { removeToast } from '@slices/toasts.slice';
import { useDispatch, useSelector } from 'react-redux';

import { toastsState } from '@slices/toasts.slice';

export const ToastWrapper = () => {
  const dispatch = useDispatch();

  const toasts = useSelector(toastsState);

  const removeToastFunc = (id: string) => {
    dispatch(removeToast(id));
  };

  return <Toasts toasts={toasts} removeToast={removeToastFunc} />;
};
