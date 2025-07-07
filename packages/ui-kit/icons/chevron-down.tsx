import type { FC } from 'react';
import type { IconProps } from './types';

export const ChevronDownIcon: FC<IconProps> = (props) => {
  const { width, height, display } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width || 16}
      height={height || 16}
      fill='none'
      viewBox='0 0 16 16'
      display={display}
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06'
        clipRule='evenodd'
      />
    </svg>
  );
};
