'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Checkbox, Input } from '@components';
import client from '@utils/apiClient';

import { addToast } from '@store';

export const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [retypePassword, setRetypePassword] = useState<string>('');
  const [sendEmails, setSendEmails] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const isDev = searchParams.get('dev') === 'true';

  const dispatch = useDispatch();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!isDev) return;

    if (password !== retypePassword) {
      dispatch(
        addToast({
          type: 'error',
          title: 'Error registering',
          description: 'Passwords do not match.',
        })
      );
      return;
    }

    try {
      dispatch(
        addToast({
          type: 'info',
          title: 'Registering account...',
        })
      );

      const result = await client.auth.register({
        email,
        username,
        password,
      });

      if (result.status === 'success') {
        dispatch(
          addToast({
            type: 'success',
            title: 'Registration successful',
            description:
              'You can now login to your account. You will be redirect to the login page within 3 seconds.',
          })
        );

        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }
    } catch (error) {
      dispatch(
        addToast({
          type: 'error',
          title: 'Error registering',
          description: `${error as string}`,
        })
      );
    }
  };

  return (
    <form
      className="bg-background relative mx-auto w-11/12 max-w-md rounded-3xl p-8"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <div className="border-border border-b pb-5">
        <h1 className="text-3xl font-bold">
          <span className="from-brand-gradient-1 to-brand-gradient-2 bg-gradient-to-r bg-clip-text text-transparent">
            Register on ODN
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
            type="text"
            id="username"
            label="Username"
            placeholder="This will be your username"
            onChange={(event) => setUsername(event.target.value)}
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
        </div>
        <div className="mt-3">
          <Input
            type="password"
            id="retype-password"
            label="Retype Password"
            placeholder="Retype password"
            onChange={(event) => setRetypePassword(event.target.value)}
            required
          />
        </div>
        <div className="mt-5 flex">
          <div className="relative w-14">
            <span className="absolute top-1/2 -translate-y-1/2">
              <Checkbox checked={sendEmails} setChecked={setSendEmails} />
            </span>
          </div>
          <p className="text-text-faint text-xs">
            It&apos;s okay to send me emails with Open Dev Net updates, tips,
            and special offers. You can opt out at any time.
          </p>
        </div>

        <div className="mt-5">
          <Button label="Create Account" type="submit" size="lg" width="full" />
        </div>

        <div className="mt-3">
          <p className="text-text-secondary text-xs">
            By registering, you agree to Open Dev Net&apos;s{' '}
            <Link href="/terms" className="link">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="link">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="text-text-secondary mt-3 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="link">
              Login
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
