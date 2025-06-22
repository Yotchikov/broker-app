import { forwardRef, useImperativeHandle, useRef, useState, type FocusEventHandler } from 'react';
import type { InputProps } from './input.types';
import clsx from 'clsx';
import styles from './input.module.css';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    htmlType = 'text',
    placeholder = '',
    className,
    isReadonly = false,
    leftNode,
    error,
    isRequired = false,
    isDisabled = false,
    size = 'm',
    ...rest
  } = props;

  const [isFocus, setIsFocus] = useState(false);
  const internalRef = useRef<HTMLInputElement>(null);
  const placeholderWithRequired = isRequired && placeholder ? `${placeholder} *` : placeholder;

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur: FocusEventHandler = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocus(false);
    }
  };

  const onClick = () => {
    if (internalRef.current) {
      internalRef.current.focus();
    }

    setIsFocus(true);
  };

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(ref, () => internalRef.current);

  const errorMessageNode = error && (
    <p
      className={styles.errorMessage}
      role={'alert'}
    >
      {error.message}
    </p>
  );

  return (
    <div
      className={clsx(styles.input, className, {
        [styles.focus]: isFocus,
        [styles.error]: error,
        [styles.disabled]: isDisabled,
        [styles[`size_${size}`]]: size,
      })}
    >
      <div
        className={styles.inputContainer}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        tabIndex={0}
      >
        {leftNode}
        <input
          type={htmlType}
          className={styles.inputControl}
          placeholder={placeholderWithRequired}
          readOnly={isReadonly}
          ref={internalRef}
          {...rest}
        />
      </div>
      {errorMessageNode}
    </div>
  );
});

Input.displayName = 'Input';
