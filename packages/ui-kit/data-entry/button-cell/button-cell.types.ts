import type { CellProps } from '../../data-display/cell/cell.types';

export type ButtonCellProps = Pick<CellProps, 'before' | 'after' | 'onClick' | 'children'> & {
  isDisabled?: boolean;
  variant?: 'primary' | 'danger';
};
