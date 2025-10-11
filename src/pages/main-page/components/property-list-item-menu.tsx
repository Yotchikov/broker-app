import { ActionIcon, Drawer, Group, Text, Stack, useDrawersStack, Button, Textarea, Divider } from '@mantine/core';
import { IconDots, IconNote, IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { propertyDataProvider } from '../../../data';
import { usePropertyForm } from '../../property-form-page/context';
import { PropertyInfoForm } from '../../property-form-page/components';
import { COMMON_DRAWER_PROPS } from './consts';

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

  const stack = useDrawersStack(['actions', 'note', 'edit', 'confirm-delete']);

  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const { submitForm } = usePropertyForm();

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

  const handleEdit = async () => {
    await submitForm();
    stack.close('edit');
  };

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
          {...COMMON_DRAWER_PROPS}
        >
          <Stack gap={'xs'}>
            <Group onClick={() => stack.open('note')}>
              <IconNote
                stroke={1.8}
                color='var(--mantine-color-dimmed)'
                size={24}
              />
              <Text size='lg'>Написать заметку</Text>
            </Group>
            <Divider ml={40} />
            <Group onClick={() => stack.open('edit')}>
              <IconPencil
                stroke={1.8}
                color='var(--mantine-color-dimmed)'
                size={24}
              />
              <Text size='lg'>Редактировать</Text>
            </Group>
            <Divider ml={40} />
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
          {...COMMON_DRAWER_PROPS}
          title={
            <Text
              size='xl'
              fw='bold'
            >
              Написать заметку
            </Text>
          }
        >
          <Textarea
            variant='unstyled'
            placeholder='Любая важная информация...'
            minRows={15}
            maxRows={15}
            autosize
            size='md'
            value={note}
            onChange={(ev) => handleNoteChange(ev.currentTarget.value)}
          />
        </Drawer>
        <Drawer
          {...stack.register('confirm-delete')}
          {...COMMON_DRAWER_PROPS}
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
                size='md'
                radius='xl'
                variant='default'
                onClick={() => stack.close('confirm-delete')}
                disabled={isDeleting}
              >
                Отмена
              </Button>
              <Button
                color='red'
                size='md'
                radius='xl'
                onClick={handleConfirmDelete}
                loading={isDeleting}
              >
                Удалить
              </Button>
            </Group>
          </Stack>
        </Drawer>
        <Drawer
          {...stack.register('edit')}
          {...COMMON_DRAWER_PROPS}
          title={
            <Text
              size='xl'
              fw='bold'
            >
              Редактировать объект
            </Text>
          }
        >
          <Stack gap='md'>
            <PropertyInfoForm withTitle={false} />
            <Button
              size='md'
              radius='xl'
              onClick={handleEdit}
            >
              Сохранить
            </Button>
          </Stack>
        </Drawer>
      </Drawer.Stack>
    </>
  );
};
