import { ActionIcon, Drawer, Group, Stack, Text, useDrawersStack } from '@mantine/core';
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
        <IconDots size={16} />
      </ActionIcon>
      <Drawer.Stack>
        <Drawer
          {...stack.register('actions')}
          position='bottom'
          styles={{ content: { height: 'auto' } }}
          offset={8}
          radius='md'
        >
          <Stack gap='md'>
            <Group onClick={() => navigate(`/properties/${propertyId}/edit?tab=prospects`)}>
              <IconPlus size={16} />
              <Text>Добавить</Text>
            </Group>
            <Group onClick={() => navigate(`/properties/${propertyId}/edit?tab=prospects`)}>
              <IconPencil size={16} />
              <Text>Редактировать</Text>
            </Group>
          </Stack>
        </Drawer>
      </Drawer.Stack>
    </>
  );
};
