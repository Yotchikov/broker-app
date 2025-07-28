import type { HTMLInputTypeAttribute } from 'react';
import type { CellProps } from '../../data-display/cell/cell.types';

export type InputCellProps = Pick<CellProps, 'before'> & {
  htmlType?: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};
