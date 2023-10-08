'use client';

import { useState } from 'react';

import { Button, Checkbox, Input } from '@odnlabs/ui';
import Link from 'next/link';

export const RegisterBox: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPasswored] = useState<string>('');
  const [retypePassword, setRetypePassword] = useState<string>('');
  const [sendEmails, setSendEmails] = useState<boolean>(true);

  return (
    <div className="max-w-md w-11/12 mx-auto rounded-3xl bg-background p-8">
      <div className="border-b border-border pb-5">
        <h1 className="text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gradient-1 to-brand-gradient-2">
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mt-3">
          <Input
            type="text"
            id="name"
            label="Name"
            placeholder="This will be your display name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mt-3">
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Choose a strong password"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mt-3">
          <Input
            type="password"
            id="retype-password"
            label="Retype Password"
            placeholder="Retype password"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mt-5 flex">
          <div className="relative w-14">
            <span className="absolute top-1/2 -translate-y-1/2">
              <Checkbox checked={sendEmails} setChecked={setSendEmails} />
            </span>
          </div>
          <p className="text-xs text-text-faint">
            It's okay to send me emails with Open Dev Net updates, tips, and
            special offers. You can opt out at any time.
          </p>
        </div>

        <div className="mt-5">
          <Button label="Create Account" size="lg" width="full" />
        </div>

        <div className="mt-3">
          <p className="text-xs text-text-secondary">
            By registering, you agree to Open Dev Net's{' '}
            <Link href="/terms" className="link">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="link">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="mt-3 text-sm text-text-secondary">
            Already have an account?{' '}
            <Link href="/login" className="link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
