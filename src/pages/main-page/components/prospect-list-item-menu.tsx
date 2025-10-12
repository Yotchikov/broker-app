import { useDrawersStack, ActionIcon, Drawer, Stack, Group, Button, Text, Divider } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import { ProspectInfoForm } from '../../property-form-page/components';
import { usePropertyForm } from '../../property-form-page/context';
import { COMMON_DRAWER_PROPS } from './consts';
import { propertyDataProvider } from '../../../data';
import { useNavigate } from 'react-router';

type ProspectListItemMenuProps = {
  prospectIndex: number;
};

export const ProspectListItemMenu = (props: ProspectListItemMenuProps) => {
  const { prospectIndex } = props;

  const { formData, updateProspect, submitForm, clearForm } = usePropertyForm();

  const navigate = useNavigate();

  const stack = useDrawersStack(['actions', 'edit', 'confirm-delete']);

  const handleSaveProspect = () => {
    submitForm();
    stack.close('edit');
  };

  const handleCloseEditProspectDrawer = () => {
    clearForm();
    stack.close('edit');
  };

  const handleConfirmDelete = () => {
    propertyDataProvider.deletePropertyProspectById(formData.prospects[prospectIndex].id);
    clearForm();
    navigate('/');
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
          <Stack gap='xs'>
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
          {...stack.register('edit')}
          {...COMMON_DRAWER_PROPS}
          title={
            <Text
              size='xl'
              fw='bold'
            >
              Редактировать клиента
            </Text>
          }
          onClose={handleCloseEditProspectDrawer}
        >
          <Stack gap='md'>
            <ProspectInfoForm
              prospect={formData.prospects[prospectIndex]}
              handleUpdateProspect={(field, value) => updateProspect(prospectIndex, { [field]: value })}
            />
            <Button
              size='md'
              radius='xl'
              onClick={handleSaveProspect}
            >
              Сохранить
            </Button>
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
              Удалить клиента?
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
              >
                Отмена
              </Button>
              <Button
                color='red'
                size='md'
                radius='xl'
                onClick={handleConfirmDelete}
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
