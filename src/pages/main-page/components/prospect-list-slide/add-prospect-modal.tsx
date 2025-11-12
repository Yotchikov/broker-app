import { Text, Drawer, Stack, Button, type DrawerProps } from '@mantine/core';
import { ProspectInfoForm } from '../../../property-form-page/components';
import { COMMON_DRAWER_PROPS } from '../consts';
import { useEffect, type FC } from 'react';
import { usePropertyForm } from '../../../property-form-page/context';

type AddProspectModalProps = Pick<DrawerProps, 'opened' | 'onClose'>;

export const AddProspectModal: FC<AddProspectModalProps> = (props) => {
  const { formData, addProspect, updateProspect, submitForm, clearForm } = usePropertyForm();
  const { opened, onClose } = props;

  useEffect(() => {
    if (opened) {
      addProspect({
        id: crypto.randomUUID(),
        name: '',
        status: 'inquired',
        contacts: {},
      });
    }
  }, [opened]);

  const handleSaveProspect = () => {
    submitForm();
    onClose();
  };

  const handleCloseAddProspectDrawer = () => {
    clearForm();
    onClose();
  };

  return (
    <Drawer
      {...COMMON_DRAWER_PROPS}
      opened={opened}
      onClose={handleCloseAddProspectDrawer}
      title={
        <Text
          size='xl'
          fw='bold'
        >
          Добавить клиента
        </Text>
      }
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
  );
};
