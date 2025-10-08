import { ActionIcon, Divider, Drawer, Group, Stack, Text, useDrawersStack } from '@mantine/core';
import { IconDots, IconPencil, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

type ProspectListMenuProps = {
  propertyId: string;
};

export const ProspectListMenu = (props: ProspectListMenuProps) => {
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
        <IconDots
          stroke={1.8}
          size={20}
        />
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
          <Stack gap='xs'>
            <Group onClick={() => navigate(`/properties/${propertyId}/edit?tab=prospects`)}>
              <IconPlus
                stroke={1.8}
                color='var(--mantine-color-dimmed)'
                size={24}
              />
              <Text size='lg'>Добавить клиента</Text>
            </Group>
            <Divider ml={40} />
            <Group onClick={() => navigate(`/properties/${propertyId}/edit?tab=prospects`)}>
              <IconPencil
                stroke={1.8}
                color='var(--mantine-color-dimmed)'
                size={24}
              />
              <Text size='lg'>Редактировать</Text>
            </Group>
          </Stack>
        </Drawer>
      </Drawer.Stack>
    </>
  );
};
