'use client';

import { useState } from 'react';

import { Button, Input, TextArea } from '@components';

export const ContactForm: React.FC = () => {
  // TODO: disable the rule below when component is implemented
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  return (
    <div className="max-w-lg w-11/12 mx-auto rounded-3xl bg-background-secondary border border-border shadow-xl p-8">
      <div className="border-b border-border pb-5">
        <h1 className="text-3xl font-bold">Get In Touch</h1>
      </div>

      <div className="mt-5">
        <Input
          type="text"
          id="name"
          label="Name"
          placeholder="Type your name here..."
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="mt-5">
        <Input
          type="email"
          id="email"
          label="Email"
          placeholder="name@example.com"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="mt-5">
        <TextArea
          id="message"
          label="Message"
          placeholder="Type your message here..."
          minLength={10}
          maxLength={500}
          className="h-32"
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </div>

      <div className="mt-8">
        <Button label="Send Message" size="lg" variant="primary" width="full" />
      </div>
    </div>
  );
};
