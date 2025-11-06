import { Stack, Space, Button, Text, Drawer, useDrawersStack } from '@mantine/core';
import { IconMoodSad, IconPlus } from '@tabler/icons-react';
import { ProspectInfoForm } from '../../../property-form-page/components';
import { COMMON_DRAWER_PROPS } from '../consts';
import { usePropertyForm } from '../../../property-form-page/context';

export const ProspectListEmptyDisclaimer = () => {
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
      <Stack
        px='md'
        py='xs'
        align='stretch'
        gap='xl'
        c='dimmed'
      >
        <Space />
        <Stack
          align='center'
          gap='xs'
        >
          <IconMoodSad
            size={48}
            stroke={1.8}
          />
          <Text ta='center'>У этого объекта пока нет клиентов</Text>
        </Stack>
        <Button
          size='md'
          radius='lg'
          leftSection={
            <IconPlus
              size={16}
              stroke={1.8}
            />
          }
          onClick={handleOpenAddProspectDrawer}
          variant='light'
        >
          Добавить
        </Button>
      </Stack>
      <Drawer.Stack>
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
              radius='xl'
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
