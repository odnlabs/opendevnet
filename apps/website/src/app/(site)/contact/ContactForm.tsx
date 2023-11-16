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
    <div className="bg-background-secondary border-border mx-auto w-11/12 max-w-lg rounded-3xl border p-8 shadow-xl">
      <div className="border-border border-b pb-5">
        <h1 className="text-3xl font-bold">Get In Touch</h1>
      </div>
      <div className="mt-5">
        <Input
          id="name"
          label="Name"
          onChange={(event) => setName(event.target.value)}
          placeholder="Type your name here..."
          required
          type="text"
        />
      </div>
      <div className="mt-5">
        <Input
          id="email"
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          required
          type="email"
        />
      </div>
      <div className="mt-5">
        <TextArea
          className="h-32"
          id="message"
          label="Message"
          maxLength={500}
          minLength={10}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type your message here..."
          required
        />
      </div>
      <div className="mt-8">
        <Button label="Send Message" size="lg" variant="primary" width="full" />
      </div>
    </div>
  );
};
