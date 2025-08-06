import type { ReactElement, ReactNode } from 'react';

import type { IconProps } from '../../icons/types';

export type ButtonProps = {
  as?: 'a' | 'button';
  children?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  size?: 'xs' | 's' | 'm' | 'l';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: ReactElement<IconProps>;
  href?: string;
  className?: string;
  onClick?: () => void;
};
