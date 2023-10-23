import React, { useState } from 'react';

import { HiChevronDown } from '@react-icons/all-files/hi/HiChevronDown';

import { SelectDropdown, SharedProps } from './Select.Dropdown';

interface Props
  extends SharedProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Additional class names to be added to the select component.
   */
  className?: string;
  /**
   * The title of the select component.
   */
  title?: string;
  /**
   * Whether the title should change when an option is selected.
   */
  fixedTitle?: boolean;
  /**
   * Whether the select component is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the select component is loading.
   */
  loading?: boolean;
}

export const Select: React.FC<Props> = ({
  options,
  state,
  setState,
  title,
  fixedTitle,
  onChange,
  disabled,
  loading,
  ...props
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  const [width, setWidth] = useState<number>(0);
  const [fromTop, setFromTop] = useState<number>(0);
  const [fromLeft, setFromLeft] = useState<number>(0);

  const toggleSelect = (
    event:
      | React.MouseEvent<EventTarget>
      | React.FocusEvent<HTMLButtonElement | Element>,
    value?: boolean
  ): void => {
    if (disabled) return;
    setFocused(value ? value : !focused);
    const target = event.target as Element;
    const rect = target.getBoundingClientRect();

    const docElem = document.body;

    const scrollTop = docElem.scrollTop;
    const scrollLeft = docElem.scrollLeft;
    const top = rect.top + scrollTop - 0;
    const left = rect.left + scrollLeft - 0;

    setWidth(rect.width);
    setFromTop(Math.round(top) + 50);
    setFromLeft(Math.round(left));
  };

  const handleScroll = (): void => {
    if (focused === true) setFocused(false);
  };

  const closeSelect = (): void => {
    setFocused(false);
  };

  let tabKey = false;

  return (
    <div
      {...props}
      className={`max-h-16 w-full overflow-visible ${focused && 'z-[100]'} ${
        props.className
      }`}
      onScroll={handleScroll}
    >
      <button
        className={`flex w-full cursor-pointer justify-between rounded-sm py-3 pl-4 pr-3 text-sm font-medium text-text-primary ring-primary/30 transition ${
          disabled
            ? 'cursor-default'
            : 'bg-[rgb(var(--input))] focus:bg-[rgb(var(--input-focus))] border-2 border-transparent focus:border-primary'
        } ${loading && 'bg-secondary-active text-transparent'}`}
        onClick={(evt) => toggleSelect(evt)}
        onFocus={(evt) => toggleSelect(evt, true)}
        onKeyDown={(evt) => {
          if (focused && evt.key === 'ArrowDown') {
            evt.preventDefault();
            document.getElementById('select-dropdown-item-0')?.focus();
          }

          if (evt.key === 'Tab') tabKey = true;
        }}
        onBlur={() => {
          if (tabKey) closeSelect();
          tabKey = false;
        }}
        id={`${focused ? 'select-btn-true' : 'select-btn-false'}`}
      >
        {fixedTitle
          ? fixedTitle
          : state
          ? options.find((opt) => opt.value === state)
            ? options.find((opt) => opt?.value === state)?.label
            : title || 'Select from dropdown'
          : title || 'Select from dropdown'}

        <HiChevronDown
          className={`pointer-events-none h-5 w-5 transition duration-200 ${
            focused && 'rotate-180'
          }`}
        />
      </button>

      <SelectDropdown
        options={options}
        focused={focused}
        setFocused={setFocused}
        state={state}
        setState={setState}
        width={width}
        fromTop={fromTop}
        fromLeft={fromLeft}
        closeSelect={closeSelect}
        onChange={onChange}
      />
    </div>
  );
};
