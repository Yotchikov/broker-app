import type { ReactNode } from 'react';

export type CellProps = {
  before?: ReactNode;
  children?: ReactNode;
  after?: ReactNode;
  subtitle?: ReactNode;
  onClick?: () => void;
};
