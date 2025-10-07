import { ActionIcon, Drawer, Group, Stack, Text, useDrawersStack } from '@mantine/core';
import { IconDots, IconPencil } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

type OwnerInfoMenuProps = {
  propertyId: string;
};

export const OwnerInfoMenu = (props: OwnerInfoMenuProps) => {
  const { propertyId } = props;

  const stack = useDrawersStack(['actions']);
  const navigate = useNavigate();

  return (
    <>
      <ActionIcon
        variant='transparent'
        color='default'
        onClick={() => stack.open('actions')}
      >
        <IconDots size={16} />
      </ActionIcon>
      <Drawer.Stack>
        <Drawer
          {...stack.register('actions')}
          position='bottom'
          styles={{ content: { height: 'auto' } }}
          offset={8}
          radius='md'
          closeButtonProps={{
            size: 'lg',
          }}
        >
          <Stack gap='md'>
            <Group onClick={() => navigate(`/properties/${propertyId}/edit?tab=owner`)}>
              <IconPencil size={24} />
              <Text size='xl'>Редактировать</Text>
            </Group>
          </Stack>
        </Drawer>
      </Drawer.Stack>
    </>
  );
};
