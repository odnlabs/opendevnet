import React, { useState } from 'react';

import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';

export interface Faq {
  question: string;
  answer: string | JSX.Element;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly data: Faq[];
  readonly autoClose?: boolean;
}

export const Accordian: React.FC<Props> = ({ data, autoClose, ...props }) => {
  const [focused, setFocused] = useState<number | null>(null);
  const [focusedArr, setFocusedArr] = useState<number[]>([]);

  return (
    <div {...props}>
      {data.map((set, index) => (
        <div
          className={`border-border text-text-primary h-full overflow-hidden border text-sm md:text-base ${
            index === 0 ? 'rounded-t-lg' : 'border-t-0'
          } ${index === data.length - 1 && 'rounded-b-lg'}`}
          key={set.question.replace(/\s/g, '').toLowerCase()}
        >
          {/* Question - button */}
          <button
            className="no-selection bg-background-secondary block w-full cursor-pointer px-5 py-5 text-left ring-inset focus-visible:ring"
            onClick={() => {
              if (autoClose) setFocused(focused === index ? null : index);
              else {
                setFocusedArr(
                  focusedArr.includes(index)
                    ? focusedArr.filter((item) => item !== index)
                    : [...focusedArr, index]
                );
              }
            }}
            type="button"
          >
            <div className="-mt-0.5 flex justify-between">
              <p className="w-[calc(100%-1.5rem)]">{set.question}</p>
              <FaChevronDown
                className={`mt-1.5 h-4 w-4 transition duration-300 ${
                  (autoClose ? focused === index : focusedArr.includes(index))
                    ? 'rotate-180'
                    : ''
                }`}
              />
            </div>
          </button>
          {/* Answer */}

          <div
            className={`grid transition-all duration-500 ${
              (autoClose ? focused === index : focusedArr.includes(index))
                ? 'grid-rows-[1fr]'
                : 'grid-rows-[0fr]'
            }`}
          >
            <div
              className={`border-border bg-background text-text-secondary overflow-hidden ${
                (autoClose ? focused === index : focusedArr.includes(index)) &&
                'border-t'
              }`}
            >
              <p className="px-5 py-5">{set.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
