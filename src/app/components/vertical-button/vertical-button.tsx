import { Button, type ButtonProps } from '@mantine/core';
import type { DOMAttributes, FC } from 'react';

export const VerticalButton: FC<ButtonProps & DOMAttributes<HTMLButtonElement>> = (props) => {
  const { children, ...rest } = props;

  const rootPadding = {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
  };

  return (
    <Button
      styles={{
        root: {
          height: 'auto',
          padding: `${rootPadding[rest.size as keyof typeof rootPadding]}`,
        },
        inner: { flexDirection: 'column' },
        section: { margin: 0 },
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
