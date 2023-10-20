import ReactDom from 'react-dom';

import { BsCheckCircle } from '@react-icons/all-files/bs/BsCheckCircle';

export interface SharedProps {
  /**
   * Array of options to be displayed in the dropdown. Each option is an object with a value and a label.
   */
  options: {
    value: string;
    label: string;
  }[];
  /**
   * The current state of the select component.
   */
  state: string | null;
  /**
   * The function to set the state of the select component.
   */
  setState:
    | React.Dispatch<React.SetStateAction<string>>
    | ((props: unknown) => void);
  /**
   * The function to be called when the select component's state changes.
   * @param params The parameters to be passed to the function.
   * @returns Nothing.
   */
  onChange?: (...params: unknown[]) => void | Promise<void>;
}

interface Props extends SharedProps {
  /**
   * Whether the select component is focused.
   */
  focused: boolean;
  /**
   * The function to set the state of the select component.
   */
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * The width of the select component.
   */
  width: number;
  /**
   * The distance from the top of the select component to the top of the viewport.
   */
  fromTop: number;
  /**
   * The distance from the left of the select component to the left of the viewport.
   */
  fromLeft: number;
  /**
   * The function to close the select component.
   * @param params The parameters to be passed to the function.
   * @returns Nothing.
   */
  closeSelect: (...params: unknown[]) => void | Promise<void>;
}

export const SelectDropdown: React.FC<Props> = ({
  options,
  focused,
  setState,
  state,
  width,
  fromTop,
  fromLeft,
  closeSelect,
  onChange,
}) =>
  document.body
    ? ReactDom.createPortal(
        <>
          <div
            className={`fixed left-0 top-0 z-[90] h-full w-full ${
              !focused && 'hidden'
            }`}
            onClick={() => {
              closeSelect();
            }}
          ></div>

          <div
            className="no-select fixed z-[100]"
            style={{ top: fromTop, left: fromLeft, width }}
            id="select-dropdown"
          >
            <div
              className={`thin-scroll top-2 z-[100] max-h-60 origin-top cursor-default overflow-y-auto overflow-x-hidden rounded-sm border border-border bg-background p-1 shadow-xl drop-shadow-lg transition-all duration-200 ${
                focused ? '' : 'invisible h-0 -translate-y-3 opacity-0'
              }`}
            >
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setState(option.value);
                    if (onChange) onChange(option.value);
                    closeSelect();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowUp') {
                      event.preventDefault();
                      let prevItem = document.getElementById(
                        `select-dropdown-item-${index - 1}`
                      );
                      if (index === 0)
                        prevItem = document.getElementById('select-btn-true');
                      if (prevItem) prevItem.focus();
                      return;
                    }

                    if (event.key === 'ArrowDown') {
                      event.preventDefault();
                      const nextItem = document.getElementById(
                        `select-dropdown-item-${index + 1}`
                      );
                      if (nextItem) nextItem.focus();
                      return;
                    }

                    if (event.key === 'Enter') {
                      setState(option.value);
                      if (onChange) onChange(option.value);
                      closeSelect();
                    }
                  }}
                  className={`text-sm rounded-sm flex w-full justify-between py-2.5 px-4 text-left ring-primary ring-inset focus-visible:ring-2 hover:bg-secondary/50 active:bg-secondary transition duration-200 ${
                    state === option.value &&
                    'bg-secondary font-medium text-text'
                  }`}
                  id={`select-dropdown-item-${index.toString()}`}
                >
                  {option.label}
                  {state === option.value && (
                    <BsCheckCircle className="mt-0.5 h-4 w-4 text-text-secondary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>,
        document.body
      )
    : null;
