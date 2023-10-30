'use client';

import { useState } from 'react';

import { Button, Input } from '@odnlabs/ui';
import { addToast } from '@store';
import client from '@utils/apiClient';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      dispatch(
        addToast({
          type: 'info',
          title: 'Authenticating user...',
        })
      );

      const result = await client.auth.login({
        email,
        password,
      });

      if (result.status === 'success') {
        dispatch(
          addToast({
            type: 'success',
            title: 'Login successful',
            description:
              'You have successfully authenticated. You will now be redirected to the app page.',
          })
        );

        window.location.href = '/app';
      }
    } catch (error) {
      dispatch(
        addToast({
          type: 'error',
          title: 'Error authenticating',
          description: `${error as string}`,
        })
      );
    }
  };
  return (
    <form
      className="max-w-md w-11/12 mx-auto rounded-3xl bg-background p-8"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <div className="border-b border-border pb-5">
        <h1 className="text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gradient-1 to-brand-gradient-2">
            Login to ODN
          </span>
        </h1>
      </div>

      <div className="mt-5">
        <div className="mt-3">
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="name@example.com"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="mt-3">
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Choose a strong password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <div className="mt-2 text-xs">
            <Link href="/forgotpassword" className="link">
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="mt-5">
          <Button label="Login" type="submit" size="lg" width="full" />
        </div>

        <div className="mt-5">
          <p className="text-sm text-text-secondary">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
