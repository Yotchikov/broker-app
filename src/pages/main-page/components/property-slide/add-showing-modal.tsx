import { useState, type FC } from 'react';
import { Text, Drawer, Stack, Button, NativeSelect, TextInput, Notification, type DrawerProps } from '@mantine/core';
import { IconExclamationMark } from '@tabler/icons-react';
import { COMMON_DRAWER_PROPS } from '../consts';
import { showingDataProvider, type Prospect } from '../../../../data';
import { useNavigate } from 'react-router';

type AddShowingModalProps = Pick<DrawerProps, 'opened' | 'onClose' | 'stackId'> & {
  propertyId: string;
  prospects: Prospect[];
  isEdit: boolean;
};

export const AddShowingModal: FC<AddShowingModalProps> = (props) => {
  const { opened, onClose, stackId, propertyId, prospects } = props;
  const navigate = useNavigate();

  const [selectedProspectId, setSelectedProspectId] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedProspectId) {
      setError('Выберите клиента');

      return;
    }
    if (!dateTime) {
      setError('Выберите дату и время');

      return;
    }

    try {
      setIsSaving(true);

      await showingDataProvider.createShowing({
        id: crypto.randomUUID(),
        propertyId,
        prospectId: selectedProspectId,
        dateTime: new Date(dateTime).toISOString(),
      });

      handleClose();
      navigate('/showings');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Не удалось добавить показ');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setSelectedProspectId('');
    setDateTime('');
    setError(null);
    onClose();
  };

  const prospectOptions = [
    { value: '', label: 'Выберите клиента' },
    ...prospects.map((prospect) => ({
      value: prospect.id,
      label: prospect.name,
    })),
  ];

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

    return now.toISOString().slice(0, 16);
  };

  return (
    <Drawer
      {...COMMON_DRAWER_PROPS}
      opened={opened}
      onClose={handleClose}
      stackId={stackId}
      title={
        <Text
          size='xl'
          fw='bold'
        >
          Добавить показ
        </Text>
      }
    >
      <Stack gap='md'>
        <NativeSelect
          label='Клиент'
          size='md'
          radius='lg'
          data={prospectOptions}
          value={selectedProspectId}
          onChange={(event) => setSelectedProspectId(event.currentTarget.value)}
        />
        <TextInput
          type='datetime-local'
          label='Дата и время'
          size='md'
          radius='lg'
          value={dateTime}
          onChange={(event) => setDateTime(event.currentTarget.value)}
          min={getMinDateTime()}
        />
        {error && (
          <Notification
            icon={<IconExclamationMark size={16} />}
            color='red'
            radius='lg'
            onClose={() => setError(null)}
            bg='red.1'
          >
            {error}
          </Notification>
        )}
        <Button
          size='md'
          radius='lg'
          onClick={handleSubmit}
          loading={isSaving}
        >
          Сохранить
        </Button>
      </Stack>
    </Drawer>
  );
};
