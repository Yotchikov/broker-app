import type { ButtonCellProps } from './button-cell.types';
import type { TextProps } from '../../data-display/text/text.types';

export const BUTTON_CELL_VARIANT_TO_TEXT_COLOR_MAP: Record<
  NonNullable<ButtonCellProps['variant']> | 'isDisabled',
  TextProps['color']
> = {
  primary: 'info',
  danger: 'error',
  isDisabled: 'disabled',
} as const;

export const BUTTON_CELL_VARIANT_TO_COLOR_MAP: Record<NonNullable<ButtonCellProps['variant']> | 'isDisabled', string> =
  {
    primary: 'var(--color-blue-500)',
    danger: 'var(--color-red-500)',
    isDisabled: 'var(--color-black-300)',
  } as const;
