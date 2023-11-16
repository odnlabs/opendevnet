'use client';

import { useDispatch, useSelector } from 'react-redux';

import { Toasts } from '@odnlabs/ui';

import { removeToast, toastsState } from '@store';

export const ToastWrapper: React.FC = () => {
  const dispatch = useDispatch();

  const toasts = useSelector(toastsState);

  const removeToastFunc = (id: string): void => {
    dispatch(removeToast(id));
  };

  return <Toasts removeToast={removeToastFunc} toasts={toasts} />;
};
