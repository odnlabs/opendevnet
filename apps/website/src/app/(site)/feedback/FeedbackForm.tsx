'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Button, Input, Select, TextArea } from '@components';

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
  const [category, setCategory] = useState<Category>(Category.Other);
  const [content, setContent] = useState<string>('');

  return (
    <div className="bg-background-secondary border-border mx-auto w-11/12 max-w-lg rounded-3xl border p-8 shadow-xl">
      <div className="border-border border-b pb-5">
        <h1 className="text-2xl font-bold">
          <span className="from-brand-gradient-3 to-brand-gradient-4 bg-gradient-to-r bg-clip-text text-transparent">
            Send us your feedback! ❤️
          </span>
        </h1>
      </div>
      <div className="mt-5">
        <div className="mt-3 flex">
          {ratingOptions.map((option) => (
            <button
              className={`mx-2 h-12 w-12 rounded-3xl p-1 transition duration-200 hover:scale-125 hover:drop-shadow-lg ${
                rating === option && 'bg-primary'
              }`}
              key={option}
              onClick={() => setRating(rating === option ? undefined : option)}
              type="button"
            >
              <div className="relative h-10 w-10">
                <Image
                  alt="Feedback rating graphic"
                  fill
                  src={`/feedback/${option}.svg`}
                />
              </div>
            </button>
          ))}
        </div>
        <div className="mt-5">
          <Select
            options={categoryOptions}
            setState={setCategory}
            state={category}
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
            id="feedback"
            label="Feedback"
            maxLength={500}
            minLength={10}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Type your feedback here..."
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
