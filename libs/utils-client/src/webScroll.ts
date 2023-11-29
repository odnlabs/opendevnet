/**
 * Enable document scrolling.
 */
const enable = (): void => {
  document.documentElement.style.overflowY = 'auto';
  document.body.style.overflowY = 'auto';
  document.body.style.paddingRight = '0px';
};

/**
 * Disable document scrolling.
 */
const disable = (): void => {
  document.documentElement.style.overflowY = 'hidden';
  document.body.style.overflowY = 'hidden';

  // Create a div with a known width and height that forces an overflow
  const div = document.createElement('div');
  div.style.width = '100px';
  div.style.height = '100px';
  div.style.overflow = 'scroll';
  document.body.appendChild(div);

  // Calculate the width of the scrollbar
  const scrollbarWidth = div.offsetWidth - div.clientWidth;

  // Remove the temporary div from the DOM
  document.body.removeChild(div);

  // Apply the scrollbar width as needed
  document.body.style.paddingRight = `${scrollbarWidth}px`;
};

export default { enable, disable };
