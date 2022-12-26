import { ComponentStyleConfig, theme } from '@chakra-ui/react';

export const Select: ComponentStyleConfig = {
  baseStyle: {
    field: {
      color: 'primary.500',
    },
  },
  sizes: {
    md: {
      h: '60px',
    },
  },
  variants: {
    filled: {
      field: {
        bg: 'input',
        borderRadius: 10,
        '&:not(:placeholder-shown)': {
          borderColor: 'primary.500',
          color: 'primary.500',
        },
        _disabled: {
          opacity: 0.5,
        },
        _focus: {
          bg: 'inputHover',
          borderColor: 'primary.500',
          boxShadow: 'none',
        },
        _hover: {
          bg: 'inputHover',
        },
        _invalid: {
          borderColor: 'error.500',
          boxShadow: 'none',
          color: 'error.500',
          '&:not(:placeholder-shown)': {
            color: 'error.500',
          },
          _focusVisible: {
            boxShadow: 'none',
            borderColor: 'error.500',
          },
        },
      },
    },
    outline: {
      field: {
        borderColor: 'input',
        borderRadius: 10,
        '&:not(:placeholder-shown)': {
          borderColor: 'input',
          color: 'primary.500',
        },
        _disabled: {
          opacity: 0.5,
        },
        _focus: {
          borderColor: 'input',
          boxShadow: 'none',
        },
        _hover: {
          borderColor: 'input',
        },
        _invalid: {
          borderColor: 'error.500',
          boxShadow: 'none',
          color: 'error.500',
          '&:not(:placeholder-shown)': {
            color: 'error.500',
          },
          _focusVisible: {
            boxShadow: 'none',
            borderColor: 'error.500',
          },
        },
      },
    },
    outlineWhite: {
      field: {
        ...theme.components.Input.variants?.outline,
        bg: 'transparent',
        border: 'solid 1px',
        borderColor: 'white',
        color: 'white',
        borderRadius: 10,
        '&:not(:placeholder-shown)': {
          borderColor: 'white',
          color: 'white',
        },
        _disabled: {
          opacity: 0.5,
        },
        _focus: {
          borderColor: 'white',
          boxShadow: 'none',
        },
        _hover: {
          borderColor: 'white',
        },
        _invalid: {
          borderColor: 'error.500',
          boxShadow: 'none',
          color: 'error.500',
          '&:not(:placeholder-shown)': {
            color: 'error.500',
          },
          _focusVisible: {
            boxShadow: 'none',
            borderColor: 'error.500',
          },
        },
      },
    },
  },
  defaultProps: {
    size: 'lg',
  },
};
