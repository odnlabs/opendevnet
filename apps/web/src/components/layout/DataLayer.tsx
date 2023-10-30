'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { config } from '@odnlabs/utils';

import { addToast, setUser } from '@store';
import client from '@utils/apiClient';
import { ServerMessage, useWebSocket } from '@utils/socket';

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

            window.location.href = `${config.site}/login`;
          });
      }
    };

    fetchUserData();
  }, [dispatch]);

  // interface SocketMessage {
  //   type: string;
  //   payload: unknown;
  // }

  const onConnect = (): void => {
    dispatch(
      addToast({
        title: 'Connected to ODN API',
        type: 'success',
      })
    );
  };

  const onConnectionError = (error: unknown): void => {
    dispatch(
      addToast({
        title: 'Error connecting to ODN API',
        type: 'error',
        description: 'Please try again later.',
      })
    );
    console.error(error);
  };

  const onMessage = (message: ServerMessage): void => {
    console.log(message);
    dispatch(
      addToast({
        title: `New Message From Server`,
        type: 'success',
        description: `${message.message}`,
      })
    );
  };

  // const { socket } =
  useWebSocket({
    onConnect,
    onConnectionError,
    onMessage,
  });

  return <>{children}</>;
};
