import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 10,
    fontSize: 'md',
    fontWeight: 600,
  },
  sizes: {
    sm: {
      borderRadius: 5,
    },
    md: {
      h: '60px',
      fontSize: 'md',
    },
  },
  defaultProps: {
    size: 'md',
    colorScheme: 'primary',
  },
};
