import {
  ActionIcon,
  Drawer,
  Group,
  Text,
  Stack,
  useDrawersStack,
  Button,
  Textarea,
  type DrawerProps,
} from '@mantine/core';
import { IconDots, IconNote, IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { propertyDataProvider } from '../../../data';

type PropertyListItemMenuProps = {
  propertyId: string;
};

export const PropertyListItemMenu = (props: PropertyListItemMenuProps) => {
  const { propertyId } = props;

  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      const property = await propertyDataProvider.getPropertyById(propertyId);
      setNote(property.note || '');
    };
    fetchProperty();
  }, [propertyId]);

  const stack = useDrawersStack(['actions', 'note', 'confirm-delete']);

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

  const handleNoteChange = async (note: string) => {
    setNote(note);
    await propertyDataProvider.updateProperty({ id: propertyId, note });
  };

  const commonDrawerProps: Partial<DrawerProps> = {
    position: 'bottom',
    styles: { content: { height: 'auto' } },
    offset: 8,
    radius: 'md',
    closeButtonProps: { size: 'lg' },
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
          {...commonDrawerProps}
        >
          <Stack gap='md'>
            <Group onClick={() => stack.open('note')}>
              <IconNote
                stroke={1.8}
                size={24}
              />
              <Text size='lg'>Заметка</Text>
            </Group>
            <Group onClick={() => navigate(`/properties/${propertyId}/edit`)}>
              <IconPencil
                stroke={1.8}
                size={24}
              />
              <Text size='lg'>Редактировать</Text>
            </Group>
            <Group
              c='red'
              onClick={() => stack.open('confirm-delete')}
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
          {...stack.register('note')}
          {...commonDrawerProps}
          title={
            <Text
              size='xl'
              fw='bold'
            >
              Заметка
            </Text>
          }
        >
          <Textarea
            variant='unstyled'
            placeholder='Любая важная информация'
            minRows={6}
            maxRows={10}
            autosize
            size='md'
            value={note}
            onChange={(ev) => handleNoteChange(ev.currentTarget.value)}
          />
        </Drawer>
        <Drawer
          {...stack.register('confirm-delete')}
          {...commonDrawerProps}
          title={
            <Text
              size='xl'
              fw='bold'
            >
              Удалить объект?
            </Text>
          }
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
