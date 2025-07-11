import type { ReactNode } from 'react';

export type TextProps = {
  children: ReactNode;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  size?: '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  color?: 'primary' | 'secondary' | 'error' | 'disabled' | 'success' | 'info';
};
