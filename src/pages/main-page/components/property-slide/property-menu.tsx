import { Drawer, Stack, Group, Divider, Button, Text, useDrawersStack } from '@mantine/core';
import { IconUserPlus, IconCalendarPlus, IconTrash } from '@tabler/icons-react';
import { PropertyInfoForm } from '../../../property-form-page/components';
import { COMMON_DRAWER_PROPS } from '../consts';
import { useNavigate } from 'react-router';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { usePropertyForm } from '../../../property-form-page/context';
import { propertyDataProvider } from '../../../../data';
import { AddShowingModal } from './add-showing-modal';

type PropertyMenuProps = {
  propertyId: string;
};

export const PropertyMenu = forwardRef<unknown, PropertyMenuProps>((props, ref) => {
  const { propertyId } = props;

  const stack = useDrawersStack(['more', 'edit', 'confirm-delete', 'add-showing']);

  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const { submitForm, formData } = usePropertyForm();

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

  const openMore = () => {
    stack.open('more');
  };

  const openEdit = () => {
    stack.open('edit');
  };

  useImperativeHandle(ref, () => ({
    openMore,
    openEdit,
  }));

  return (
    <Drawer.Stack>
      <Drawer
        {...stack.register('more')}
        {...COMMON_DRAWER_PROPS}
      >
        <Stack gap={'xs'}>
          <Group>
            <IconUserPlus
              stroke={1.8}
              size={24}
            />
            <Text size='lg'>Добавить клиента</Text>
          </Group>
          <Divider ml={40} />
          <Group
            onClick={() => stack.open('add-showing')}
            style={{ cursor: 'pointer' }}
          >
            <IconCalendarPlus
              stroke={1.8}
              size={24}
            />
            <Text size='lg'>Добавить показ</Text>
          </Group>
          <Divider ml={40} />
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
            Изменить объект
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
      <AddShowingModal
        {...stack.register('add-showing')}
        propertyId={propertyId}
        prospects={formData.prospects}
        isEdit={false}
      />
    </Drawer.Stack>
  );
});
