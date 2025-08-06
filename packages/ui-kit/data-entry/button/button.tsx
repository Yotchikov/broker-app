import { cloneElement, createElement, type FC } from 'react';
import clsx from 'clsx';

import styles from './button.module.css';
import { ICON_PROPS } from './button.consts';
import type { ButtonProps } from './button.types';

export const Button: FC<ButtonProps> = (props) => {
  const {
    as = 'button',
    isLoading = false,
    isDisabled = false,
    variant = 'primary',
    size = 'm',
    icon,
    children,
    href,
    className,
    onClick,
  } = props;
  const iconContent = icon && cloneElement(icon, ICON_PROPS[size]);

  return createElement(
    as,
    {
      className: clsx(styles.button, className, styles[`variant_${variant}`], styles[`size_${size}`], {
        [styles.disabled]: isDisabled,
        [styles.loading]: isLoading,
        [styles.onlyIcon]: icon && !children,
      }),
      disabled: isDisabled || isLoading,
      href,
      onClick,
    },
    <>
      {iconContent}
      {children && <span className={styles.buttonContent}>{children}</span>}
    </>,
  );
};
