'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import client from '@utils/apiClient';

import { Button, Input } from '@components';
import { addToast } from '@store';
import Link from 'next/link';

interface LoginFormProps {
  webClient?: string | undefined;
}

export const LoginForm: React.FC<LoginFormProps> = ({ webClient }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const searchParams = useSearchParams();
  const isDev = searchParams.get('dev') === 'true';

  const dispatch = useDispatch();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!isDev) return;

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

        if (webClient) window.location.href = webClient;
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
      className="bg-background no-select relative mx-auto w-11/12 max-w-md rounded-3xl p-8"
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
            id="email"
            label="Email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            required
            type="email"
          />
        </div>
        <div className="mt-3">
          <Input
            id="password"
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Choose a strong password"
            required
            type="password"
          />
          <div className="mt-2 text-xs">
            <Link className="link" href="/forgotpassword">
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <Button label="Login" size="lg" type="submit" width="full" />
        </div>
        <div className="mt-5">
          <p className="text-text-secondary text-sm">
            Don&apos;t have an account?{' '}
            <Link className="link" href="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
      {/* Temporary */}
      {!isDev && (
        <div className="bg-background/75 absolute left-0 top-0 h-full w-full rounded-3xl text-center text-white backdrop-blur-md">
          <div className="absolute left-1/2 top-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 drop-shadow-md">
            <p className="text-4xl font-bold">Coming Soon</p>
            <p className="text-text-secondary mt-5">
              We&apos;re working hard to bring you the best experience possible.
            </p>
            <div className="mt-8">
              <Link href="/">
                <Button label="Back to Home" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
