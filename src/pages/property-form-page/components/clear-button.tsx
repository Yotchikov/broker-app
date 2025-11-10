import { ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

type ClearButtonProps = {
  onClick: () => void;
};

export const ClearButton = (props: ClearButtonProps) => {
  const { onClick } = props;

  return (
    <ActionIcon
      variant='transparent'
      color='gray'
      onClick={onClick}
      size='sm'
    >
      <IconX size={16} />
    </ActionIcon>
  );
};
