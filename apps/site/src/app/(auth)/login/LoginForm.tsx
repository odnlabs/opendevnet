'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import client from '@utils/apiClient';

import { Button, Input } from '@components';
import { addToast } from '@store';
import Link from 'next/link';

interface LoginFormProps {
  web?: string | undefined;
}

export const LoginForm: React.FC<LoginFormProps> = ({ web }) => {
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

        if (web) window.location.href = web;
        else window.location.href = '/';
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
      className="bg-background mx-auto w-11/12 max-w-md rounded-3xl p-8"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <div className="border-border border-b pb-5">
        <h1 className="text-3xl font-bold">
          <span className="from-brand-gradient-1 to-brand-gradient-2 bg-gradient-to-r bg-clip-text text-transparent">
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
          <p className="text-text-secondary text-sm">
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
