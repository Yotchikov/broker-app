import { cloneElement, isValidElement, type FC, type ReactElement } from 'react';
import type { ButtonCellProps } from './button-cell.types';
import { Cell, Text } from '../../data-display';
import { BUTTON_CELL_VARIANT_TO_COLOR_MAP, BUTTON_CELL_VARIANT_TO_TEXT_COLOR_MAP } from './button-cell.consts';

export const ButtonCell: FC<ButtonCellProps> = (props) => {
  const { children, before, onClick, isDisabled, variant = isDisabled ? 'isDisabled' : 'primary' } = props;

  const beforeNode = isValidElement(before)
    ? cloneElement(before as ReactElement<{ color: string }>, {
        color: BUTTON_CELL_VARIANT_TO_COLOR_MAP[variant],
      })
    : before;

  const childrenNode =
    typeof children === 'string' ? (
      <Text color={BUTTON_CELL_VARIANT_TO_TEXT_COLOR_MAP[variant]}>{children}</Text>
    ) : (
      children
    );

  return (
    <Cell
      before={beforeNode}
      onClick={isDisabled ? undefined : onClick}
    >
      {childrenNode}
    </Cell>
  );
};
