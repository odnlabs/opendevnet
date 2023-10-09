'use client';

import { useState } from 'react';

import { Button, Input } from '@odnlabs/ui';
import Link from 'next/link';

export const LoginBox: React.FC = () => {
  // TODO: disable the rule below when component is implemented
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  return (
    <div className="max-w-md w-11/12 mx-auto rounded-3xl bg-background p-8">
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
            onChange={(event) => setName(event.target.value)}
            required
          />
          <div className="mt-2 text-xs">
            <Link href="/forgotpassword" className="link">
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="mt-5">
          <Button label="Login" size="lg" width="full" />
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
    </div>
  );
};
