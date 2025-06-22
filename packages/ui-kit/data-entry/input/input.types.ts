import type { HTMLInputTypeAttribute } from 'react';
import type { ReactNode } from 'react';

export type InputProps = {
  htmlType?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  isReadonly?: boolean;
  leftNode?: ReactNode;
  error?: { message: string };
  isRequired?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  value?: string;
  size?: 's' | 'm';
};
