import { Drawer, Stack, Group, Divider, Button, Text, useDrawersStack } from '@mantine/core';
import { IconUserPlus, IconCopy, IconTrash } from '@tabler/icons-react';
import { PropertyInfoForm } from '../../../../property-form-page/components';
import { COMMON_DRAWER_PROPS } from '../../consts';
import { useNavigate } from 'react-router';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { usePropertyForm } from '../../../../property-form-page/context';
import { propertyDataProvider } from '../../../../../data';

type PropertyMenuProps = {
  propertyId: string;
};

export const PropertyMenu = forwardRef<unknown, PropertyMenuProps>((props, ref) => {
  const { propertyId } = props;

  const stack = useDrawersStack(['more', 'edit', 'confirm-delete']);

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
          <Group>
            <IconCopy
              stroke={1.8}
              size={24}
            />
            <Text size='lg'>Копировать информацию</Text>
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
  );
});
