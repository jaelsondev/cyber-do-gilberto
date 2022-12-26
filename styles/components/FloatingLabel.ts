import { extendTheme } from '@chakra-ui/react';
const activeLabelStyles = (color: string, bgBefore: string) => ({
  fontSize: 'xs',
  transform: 'translateY(calc(-100% - var(--chakra-fontSizes-xs) / 4 + 1px))',
  color: color,
  _invalid: {
    color: 'error.500',
  },
  _before: {
    content: '""',
    height: '2px',
    width: '100%',
    position: 'absolute',
    bottom: 'calc(50% - 1px)',
    left: 0,
    zIndex: -1,
    bg: bgBefore,
  },
});

export const FloatingLabel = extendTheme({
  variants: {
    floating: {
      container: {
        position: 'relative',
        _focusWithin: {
          label: {
            ...activeLabelStyles('primary.500', 'inputHover'),
          },
        },
        'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label': {
          ...activeLabelStyles('primary.500', 'inputHover'),
        },
        label: {
          top: 0,
          left: 0,
          zIndex: 2,
          position: 'absolute',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          mx: 3,
          px: 1,
          my: 3,
          transformOrigin: 'left top',
          color: 'primary.500',
        },
      },
    },
    floatingWhite: {
      container: {
        position: 'relative',
        _focusWithin: {
          label: {
            ...activeLabelStyles('inputHover', 'primary.500'),
          },
        },
        'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label': {
          ...activeLabelStyles('inputHover', 'primary.500'),
        },
        label: {
          top: 0,
          left: 0,
          zIndex: 2,
          position: 'absolute',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          mx: 3,
          px: 1,
          my: 3,
          transformOrigin: 'left top',
        },
      },
    },
  },
});
