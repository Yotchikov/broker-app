import { ActionIcon, Button, Drawer, Group, Stack, Text, useDrawersStack } from '@mantine/core';
import { IconDots, IconPencil } from '@tabler/icons-react';
import { usePropertyForm } from '../../property-form-page/context';
import { OwnerInfoForm } from '../../property-form-page/components';
import { COMMON_DRAWER_PROPS } from './consts';

export const OwnerInfoMenu = () => {
  const stack = useDrawersStack(['actions', 'edit']);
  const { submitForm } = usePropertyForm();

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
          <Stack gap='md'>
            <Group onClick={() => stack.open('edit')}>
              <IconPencil
                stroke={1.8}
                size={24}
                color='var(--mantine-color-dimmed)'
              />
              <Text size='lg'>Редактировать</Text>
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
              Редактировать собственника
            </Text>
          }
        >
          <Stack gap='md'>
            <OwnerInfoForm withTitle={false} />
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
