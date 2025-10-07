import { ActionIcon, Drawer, Group, Text, Stack, useDrawersStack, Button } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { propertyDataProvider } from '../../../data';

type PropertyListItemMenuProps = {
  propertyId: string;
};

export const PropertyListItemMenu = (props: PropertyListItemMenuProps) => {
  const { propertyId } = props;

  const stack = useDrawersStack(['actions', 'confirm-delete']);

  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await propertyDataProvider.deletePropertyById(propertyId);
      navigate('/');
    } finally {
      setIsDeleting(false);
    }
  };

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
            <Group onClick={() => navigate(`/properties/${propertyId}/edit`)}>
              <IconPencil size={24} />
              <Text size='xl'>Редактировать</Text>
            </Group>
            <Group
              c='red'
              onClick={() => stack.open('confirm-delete')}
            >
              <IconTrash size={24} />
              <Text size='xl'>Удалить</Text>
            </Group>
          </Stack>
        </Drawer>
        <Drawer
          {...stack.register('confirm-delete')}
          position='bottom'
          title='Удалить объект?'
          styles={{ content: { height: 'auto' } }}
          offset={8}
          radius='md'
        >
          <Stack gap='md'>
            <Text>Вы уверены? Это действие нельзя отменить.</Text>
            <Group justify='flex-end'>
              <Button
                variant='default'
                onClick={() => stack.close('confirm-delete')}
                disabled={isDeleting}
              >
                Отмена
              </Button>
              <Button
                color='red'
                onClick={handleConfirmDelete}
                loading={isDeleting}
              >
                Удалить
              </Button>
            </Group>
          </Stack>
        </Drawer>
      </Drawer.Stack>
    </>
  );
};
