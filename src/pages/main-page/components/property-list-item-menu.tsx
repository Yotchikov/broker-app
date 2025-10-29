import { ActionIcon, Drawer, Group, Text, Stack, useDrawersStack, Button, Divider } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
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

  const stack = useDrawersStack(['actions', 'edit', 'confirm-delete']);

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
              radius='lg'
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
