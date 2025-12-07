import { Drawer, Stack, Group, Button, Text, useDrawersStack } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { showingDataProvider } from 'data';

const COMMON_DRAWER_PROPS = {
  position: 'bottom' as const,
  styles: { content: { height: 'auto', marginBottom: 16 } },
  offset: 12,
  radius: 'xl' as const,
  closeButtonProps: { size: 'lg' as const },
};

type ShowingMenuProps = {
  showingId: string;
};

export const ShowingMenu = forwardRef<unknown, ShowingMenuProps>((props, ref) => {
  const { showingId } = props;

  const stack = useDrawersStack(['actions', 'confirm-delete']);

  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await showingDataProvider.deleteShowingById(showingId);
      navigate('/showings');
    } finally {
      setIsDeleting(false);
    }
  };

  const openMenu = () => {
    stack.open('actions');
  };

  useImperativeHandle(ref, () => ({
    openMenu,
  }));

  return (
    <Drawer.Stack>
      <Drawer
        {...stack.register('actions')}
        {...COMMON_DRAWER_PROPS}
      >
        <Stack gap={'xs'}>
          <Group
            c='red'
            onClick={() => stack.open('confirm-delete')}
            style={{ cursor: 'pointer' }}
          >
            <IconTrash
              stroke={1.8}
              size={24}
            />
            <Text size='lg'>Удалить</Text>
          </Group>
        </Stack>
      </Drawer>
      <Drawer
        {...stack.register('confirm-delete')}
        {...COMMON_DRAWER_PROPS}
        title={
          <Text
            size='xl'
            fw='bold'
          >
            Удалить показ?
          </Text>
        }
      >
        <Stack gap='md'>
          <Text>Вы уверены? Это действие нельзя отменить.</Text>
          <Group justify='flex-end'>
            <Button
              size='md'
              radius='lg'
              variant='default'
              onClick={() => stack.close('confirm-delete')}
              disabled={isDeleting}
            >
              Отмена
            </Button>
            <Button
              color='red'
              size='md'
              radius='lg'
              onClick={handleConfirmDelete}
              loading={isDeleting}
            >
              Удалить
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </Drawer.Stack>
  );
});
