import { ComponentStyleConfig } from '@chakra-ui/react';

export const FormLabel: ComponentStyleConfig = {
  baseStyle: {
    color: 'primary.500',
    fontWeight: 400,
    _invalid: {
      color: 'error.500',
    },
  },
  defaultProps: {
    variant: 'filled',
    size: 'lg',
  },
};
