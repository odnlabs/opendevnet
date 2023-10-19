'use client';

import { useState } from 'react';

import { Button, Input, Select, TextArea } from '@components';
import Image from 'next/image';

export const FeedbackForm: React.FC = () => {
  enum Rating {
    Negative = 'negative',
    Neutral = 'neutral',
    Positive = 'positive',
  }

  const ratingOptions: Rating[] = [
    Rating.Negative,
    Rating.Neutral,
    Rating.Positive,
  ];

  enum Category {
    Bug = 'bug',
    Suggestion = 'suggestion',
    Other = 'other',
  }

  const categoryOptions: { label: string; value: Category }[] = [
    { label: 'Bug', value: Category.Bug },
    { label: 'Suggestion', value: Category.Suggestion },
    { label: 'Other', value: Category.Other },
  ];

  // TODO: disable the rule below when component is implemented
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [email, setEmail] = useState<string>('');
  const [rating, setRating] = useState<Rating | undefined>(undefined);
  const [category, setCategory] = useState<string>(Category.Other);
  const [content, setContent] = useState<string>('');

  return (
    <div className="max-w-lg w-11/12 mx-auto rounded-3xl bg-background-secondary border border-border shadow-xl p-8">
      <div className="border-b border-border pb-5">
        <h1 className="text-2xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gradient-3 to-brand-gradient-4">
            Send us your feedback! ❤️
          </span>
        </h1>
      </div>

      <div className="mt-5">
        <div className="mt-3 flex">
          {ratingOptions.map((option, index) => (
            <button
              key={index}
              className={`mx-2 h-12 w-12 rounded-3xl p-1 transition duration-200 hover:scale-125 hover:drop-shadow-lg ${
                rating === option && 'bg-primary'
              }`}
              onClick={() => setRating(rating === option ? undefined : option)}
            >
              <div className="relative h-10 w-10">
                <Image
                  src={`/feedback/${option}.svg`}
                  alt="Feedback rating graphic"
                  fill={true}
                />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-5">
          <Select
            options={categoryOptions}
            state={category}
            setState={setCategory}
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
            id="feedback"
            label="Feedback"
            placeholder="Type your feedback here..."
            minLength={10}
            maxLength={500}
            className="h-32"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="mt-8">
          <Button label="Submit" size="lg" variant="primary" width="full" />
        </div>
      </div>
    </div>
  );
};
