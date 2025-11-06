import { ActionIcon, Button, Drawer, Group, Stack, Text, useDrawersStack } from '@mantine/core';
import { IconDots, IconPlus } from '@tabler/icons-react';
import { COMMON_DRAWER_PROPS } from '../consts';
import { ProspectInfoForm } from '../../../property-form-page/components/prospect-info-form';
import { usePropertyForm } from '../../../property-form-page/context';

export const ProspectListMenu = () => {
  const { formData, addProspect, updateProspect, submitForm, clearForm } = usePropertyForm();

  const stack = useDrawersStack(['actions', 'add']);

  const handleOpenAddProspectDrawer = () => {
    addProspect({
      id: crypto.randomUUID(),
      name: '',
      status: 'inquired',
      contacts: {},
    });

    stack.open('add');
  };

  const handleSaveProspect = () => {
    submitForm();
    stack.close('add');
  };

  const handleCloseAddProspectDrawer = () => {
    clearForm();
    stack.close('add');
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
          position='bottom'
          styles={{ content: { height: 'auto' } }}
          offset={8}
          radius='md'
          closeButtonProps={{
            size: 'lg',
          }}
        >
          <Stack gap='xs'>
            <Group onClick={handleOpenAddProspectDrawer}>
              <IconPlus
                stroke={1.8}
                color='var(--mantine-color-dimmed)'
                size={24}
              />
              <Text size='lg'>Добавить</Text>
            </Group>
          </Stack>
        </Drawer>
        <Drawer
          {...stack.register('add')}
          {...COMMON_DRAWER_PROPS}
          title={
            <Text
              size='xl'
              fw='bold'
            >
              Добавить клиента
            </Text>
          }
          onClose={handleCloseAddProspectDrawer}
        >
          <Stack gap='md'>
            <ProspectInfoForm
              prospect={formData.prospects[0]}
              handleUpdateProspect={(field, value) => updateProspect(0, { [field]: value })}
            />
            <Button
              size='md'
              radius='lg'
              onClick={handleSaveProspect}
            >
              Сохранить
            </Button>
          </Stack>
        </Drawer>
      </Drawer.Stack>
    </>
  );
};
