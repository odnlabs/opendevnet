const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      ...colors,
      // Primary
      'primary': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--primary), ${opacityValue})`
          : `rgba(var(--primary))`;
      },
      'primary-hover': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--primary-hover), ${opacityValue})`
          : `rgba(var(--primary-hover))`;
      },
      'primary-active': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--primary-active), ${opacityValue})`
          : `rgba(var(--primary-active))`;
      },
      'secondary': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--secondary), ${opacityValue})`
          : `rgba(var(--secondary))`;
      },
      'secondary-hover': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--secondary-hover), ${opacityValue})`
          : `rgba(var(--secondary-hover))`;
      },
      'secondary-active': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--secondary-active), ${opacityValue})`
          : `rgba(var(--secondary-active))`;
      },
      'secondary': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--secondary), ${opacityValue})`
          : `rgba(var(--secondary))`;
      },
      'secondary-hover': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--secondary-hover), ${opacityValue})`
          : `rgba(var(--secondary-hover))`;
      },
      'secondary-active': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--secondary-active), ${opacityValue})`
          : `rgba(var(--secondary-active))`;
      },

      // Text
      'text': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--text), ${opacityValue})`
          : `rgba(var(--text))`;
      },
      'text-primary': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--text-primary), ${opacityValue})`
          : `rgba(var(--text-primary))`;
      },
      'text-secondary': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--text-secondary), ${opacityValue})`
          : `rgba(var(--text-secondary))`;
      },
      'text-faint': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--text-faint), ${opacityValue})`
          : `rgba(var(--text-faint))`;
      },
      'text-button': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--text-button), ${opacityValue})`
          : `rgba(var(--text-button))`;
      },

      // Background
      'background': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--background), ${opacityValue})`
          : `rgba(var(--background))`;
      },
      'shade': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--shade), ${opacityValue})`
          : `rgba(var(--shade))`;
      },
      'tooltip': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--tooltip), ${opacityValue})`
          : `rgba(var(--tooltip))`;
      },
      'tooltip-text': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--tooltip-text), ${opacityValue})`
          : `rgba(var(--tooltip-text))`;
      },

      // System
      'warning': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--warning), ${opacityValue})`
          : `rgba(var(--warning))`;
      },
      'warning-hover': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--warning-hover), ${opacityValue})`
          : `rgba(var(--warning-hover))`;
      },
      'warning-active': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--warning-active), ${opacityValue})`
          : `rgba(var(--warning-active))`;
      },
      'success': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--success), ${opacityValue})`
          : `rgba(var(--success))`;
      },
      'success-hover': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--success-hover), ${opacityValue})`
          : `rgba(var(--success-hover))`;
      },
      'success-active': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--success-active), ${opacityValue})`
          : `rgba(var(--success-active))`;
      },
      'danger': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--danger), ${opacityValue})`
          : `rgba(var(--danger))`;
      },
      'danger-hover': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--danger-hover), ${opacityValue})`
          : `rgba(var(--danger-hover))`;
      },
      'danger-active': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--danger-active), ${opacityValue})`
          : `rgba(var(--danger-active))`;
      },

      // Components
      'link': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--link), ${opacityValue})`
          : `rgba(var(--link))`;
      },
      'input': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--input), ${opacityValue})`
          : `rgba(var(--input))`;
      },
      'input-focus': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--input-focus), ${opacityValue})`
          : `rgba(var(--input-focus))`;
      },
      'border': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--border), ${opacityValue})`
          : `rgba(var(--border))`;
      },

      // Header
      'header': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--header), ${opacityValue})`
          : `rgba(var(--header))`;
      },
      'header-text': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--header-text), ${opacityValue})`
          : `rgba(var(--header-text))`;
      },
      'navigation-bar': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--navigation-bar), ${opacityValue})`
          : `rgba(var(--navigation-bar))`;
      },
      'navigation-bar-text': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--navigation-bar-text), ${opacityValue})`
          : `rgba(var(--navigation-bar-text))`;
      },
      'sidebar': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--sidebar), ${opacityValue})`
          : `rgba(var(--sidebar))`;
      },
      'sidebar-text': ({ opacityValue }) => {
        return opacityValue !== undefined
          ? `rgba(var(--sidebar-text), ${opacityValue})`
          : `rgba(var(--sidebar-text))`;
      },
    },
    extend: {
      width: {
        '1/2': '50%',
        '2/2': '100%',
        '1/3': '33.33%',
        '2/3': '66.66%',
        '3/3': '100%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '4/4': '100%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '5/5': '100%',
        '1/8': 'calc(100% / 7)',
      },
      zIndex: {
        0: '0',
        5: '5',
        10: '10',
        15: '15',
        20: '20',
        25: '25',
        30: '30',
        35: '35',
        40: '40',
        45: '45',
        50: '50',
        55: '55',
        60: '60',
        65: '65',
        70: '70',
        75: '75',
        80: '80',
        85: '85',
        90: '90',
        95: '95',
        100: '100',
      },
      borderRadius: {
        sm: '4px',
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
      },
      keyframes: {
        fadein: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        fadein: 'fadein .3s ease',
      },
      listStyleType: { square: 'square', roman: 'upper-roman' },
    },
    // Fonts
    fontFamily: {
      'nunito-sans': 'Nunito Sans',
      'fira': 'Fira Code',
      'dancing-script': 'dancing-script',
    },
    //Font Weight
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    minWidth: {
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.62rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '0.1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    maxWidth: {
      '0': '0rem',
      '1': '0.25rem',
      '1.5': '0.375rem',
      '2': '0.5rem',
      '2.5': '0.62rem',
      '3': '0.75rem',
      '3.5': '0.875rem',
      '4': '0.1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
      '11': '2.75rem',
      '12': '3rem',
      '14': '3.5rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '28': '7rem',
      '32': '8rem',
      '36': '9rem',
      '40': '10rem',
      '44': '11rem',
      '48': '12rem',
      '52': '13rem',
      '56': '14rem',
      '60': '15rem',
      '64': '16rem',
      '72': '18rem',
      '80': '20rem',
      '96': '24rem',
      'xs': '24rem',
      'sm': '24rem',
      'md': '28rem',
      'lg': '32rem',
      'xl': '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
      '8xl': '1600px',
      'full': '100%',
    },
  },
  plugins: [],
};
