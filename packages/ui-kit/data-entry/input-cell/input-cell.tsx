import type { FC } from 'react';
import type { InputCellProps } from './input-cell.types';
import { Cell } from '../../data-display';
import styles from './input-cell.module.css';

export const InputCell: FC<InputCellProps> = (props) => {
  const { before, placeholder, value, onChange, htmlType } = props;

  return (
    <Cell
      className={styles.input}
      before={before}
    >
      <input
        className={styles.inputControl}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        type={htmlType}
      />
    </Cell>
  );
};
