import React, { useState } from 'react';

import { FaChevronDown } from 'react-icons/fa';

export interface FAQ {
  question: string;
  answer: string | JSX.Element;
}

interface Props {
  data: FAQ[];
  autoClose?: boolean;
}

export const Accordian: React.FC<Props> = ({ data, autoClose }) => {
  const [focused, setFocused] = useState<number | null>(null);
  const [focusedArr, setFocusedArr] = useState<number[]>([]);

  return (
    <>
      {data.map((set, index) => (
        <div
          key={index}
          className={`h-full overflow-hidden border border-border text-text-primary ${
            index === 0 ? 'rounded-t-lg' : 'border-t-0'
          } ${index === data.length - 1 && 'rounded-b-lg'}`}
        >
          {/* Question - button */}
          <button
            className="no-selection block w-full cursor-pointer bg-background-secondary px-5 py-5 ring-inset"
            onClick={() => {
              if (autoClose) setFocused(focused === index ? null : index);
              else
                setFocusedArr(
                  focusedArr.includes(index)
                    ? focusedArr.filter((item) => item !== index)
                    : [...focusedArr, index]
                );
            }}
          >
            <div className="-mt-0.5 flex justify-between">
              {set.question}
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
              className={`overflow-hidden border-border bg-background text-base text-text-secondary ${
                (autoClose ? focused === index : focusedArr.includes(index)) &&
                'border-t'
              }`}
            >
              <p className="px-5 py-5"> {set.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
