import type { FC } from 'react';
import clsx from 'clsx';
import React from 'react';

import type { TextProps } from './text.types';
import styles from './text.module.css';

export const Text: FC<TextProps> = (props) => {
  const { children, as = 'p', size = 'm', weight = 'regular', align = 'left', className, color = 'primary' } = props;

  return React.createElement(
    as,
    {
      className: clsx(
        styles.text,
        styles[`size_${size}`],
        styles[`weight_${weight}`],
        styles[`align_${align}`],
        styles[`color_${color}`],
        className,
      ),
    },
    children,
  );
};
