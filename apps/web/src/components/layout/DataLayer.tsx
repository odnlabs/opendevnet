'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addToast, setUser } from '@store';
import client from '@utils/apiClient';

interface DataLayerProps {
  children: React.ReactNode;
}

export const DataLayer: React.FC<DataLayerProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      try {
        const user = await client.users.me.get();
        dispatch(setUser(user));
        dispatch(
          addToast({
            type: 'success',
            title: 'Welcome back!',
            description: 'Your data has been fetched.',
          })
        );
        console.log(user);
      } catch (error) {
        console.log(error);

        client.auth
          .refresh()
          .then(() => {
            fetchUserData();
          })
          .catch(() => {
            dispatch(setUser(undefined));
            dispatch(
              addToast({
                type: 'error',
                title: 'Error fetching user data',
                description: 'Please try again later.',
              })
            );

            window.location.href = '/login';
          });
      }
    };

    fetchUserData();
  }, [dispatch]);

  return <>{children}</>;
};
