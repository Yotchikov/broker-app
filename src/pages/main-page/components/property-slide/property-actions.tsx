import { Button, Divider, Drawer, Group, Stack, useDrawersStack, Text } from '@mantine/core';
import { IconCopy, IconDots, IconPencil, IconShare3, IconTrash, IconUserPlus } from '@tabler/icons-react';
import { VerticalButton } from '../../../../app/components';
import { PropertyInfoForm } from '../../../property-form-page/components';
import { COMMON_DRAWER_PROPS } from '../consts';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { propertyDataProvider } from '../../../../data';
import { usePropertyForm } from '../../../property-form-page/context';

type PropertyActionsProps = {
  propertyId: string;
};

export const PropertyActions = (props: PropertyActionsProps) => {
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Посмотри этот объект',
          text: 'Тут будет описание объекта',
          url: 'https://example.com', // или window.location.href
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Group gap='xs'>
        <VerticalButton
          leftSection={
            <IconPencil
              stroke={1.8}
              size={24}
            />
          }
          variant='light'
          size='xs'
          radius='lg'
          flex={1}
          onClick={() => stack.open('edit')}
        >
          Изменить
        </VerticalButton>
        <VerticalButton
          leftSection={
            <IconShare3
              stroke={1.8}
              size={24}
            />
          }
          variant='light'
          size='xs'
          radius='lg'
          flex={1}
          onClick={handleShare}
        >
          Отправить
        </VerticalButton>
        <VerticalButton
          leftSection={
            <IconDots
              stroke={1.8}
              size={24}
            />
          }
          variant='light'
          size='xs'
          radius='lg'
          flex={1}
          onClick={() => stack.open('actions')}
        >
          Ещё
        </VerticalButton>
      </Group>
      <Drawer.Stack>
        <Drawer
          {...stack.register('actions')}
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
    </>
  );
};
