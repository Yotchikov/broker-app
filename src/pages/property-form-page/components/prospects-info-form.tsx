import { usePropertyForm } from '../context';
import { Box, Group, Stack, TextInput, ActionIcon, Card, Text, Title, Notification, NativeSelect } from '@mantine/core';
import { IconBrandTelegram, IconBrandWhatsapp, IconMail, IconPhone, IconPlus, IconTrash } from '@tabler/icons-react';
import type { ProspectStatus } from 'data';

const prospectStatuses: Array<{ value: ProspectStatus; label: string }> = [
  { value: 'inquired', label: 'Интересовался' },
  { value: 'scheduled_a_showing', label: 'Запланирован показ' },
  { value: 'feedback_from_the_showing', label: 'Отзыв после показа' },
  { value: 'request_to_the_owner', label: 'Запрос владельцу' },
  { value: 'bargaining', label: 'Торги' },
  { value: 'contract_discussion', label: 'Обсуждение договора' },
  { value: 'document_preparation', label: 'Подготовка документов' },
  { value: 'scheduled_signing', label: 'Запланировано подписание' },
  { value: 'deal', label: 'Сделка' },
  { value: 'feedback_from_the_deal', label: 'Отзыв после сделки' },
];

export const ProspectsInfoForm = () => {
  const { formData, addProspect, removeProspect, updateProspect, isLoading, error, setError } = usePropertyForm();

  const handleAddProspect = () => {
    addProspect({
      name: '',
      status: 'inquired',
      contacts: {},
    });
  };

  const handleUpdateProspect = (index: number, field: string, value: string) => {
    updateProspect(index, { [field]: value });
  };

  return (
    <Stack gap='md'>
      <Group justify='space-between'>
        <Title order={3}>Клиенты</Title>
        <ActionIcon
          size='md'
          variant='transparent'
          color='default'
          onClick={handleAddProspect}
          loading={isLoading}
        >
          <IconPlus size={24} />
        </ActionIcon>
      </Group>

      {formData.prospects.length === 0 ? (
        <Box
          ta='center'
          py='xl'
        >
          <Text c='dimmed'>Добавьте первого клиента</Text>
        </Box>
      ) : (
        <Stack gap='md'>
          {formData.prospects.map((prospect, index) => (
            <Card
              key={index}
              shadow='md'
              radius='md'
            >
              <Stack gap='sm'>
                <Group justify='space-between'>
                  <Title order={4}>Клиент {index + 1}</Title>
                  <ActionIcon
                    color='red'
                    variant='transparent'
                    onClick={() => removeProspect(index)}
                    loading={isLoading}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
                <TextInput
                  label='Имя'
                  size='md'
                  variant='filled'
                  placeholder='Александр Еремеев'
                  required
                  value={prospect.name}
                  onChange={(ev) => handleUpdateProspect(index, 'name', ev.currentTarget.value)}
                />
                <NativeSelect
                  label='Статус'
                  size='md'
                  variant='filled'
                  data={prospectStatuses}
                  value={prospect.status}
                  onChange={(event) =>
                    handleUpdateProspect(index, 'status', event.currentTarget.value as ProspectStatus)
                  }
                />
                <Title order={4}>Контакты</Title>
                <TextInput
                  size='md'
                  variant='filled'
                  leftSection={<IconPhone size={16} />}
                  placeholder='+7 (999) 123-45-67'
                  value={prospect.contacts.phone}
                  onChange={(ev) => handleUpdateProspect(index, 'phone', ev.currentTarget.value)}
                />

                <TextInput
                  size='md'
                  variant='filled'
                  leftSection={<IconMail size={16} />}
                  placeholder='alexander@example.com'
                  type='email'
                  value={prospect.contacts.email}
                  onChange={(ev) => handleUpdateProspect(index, 'email', ev.currentTarget.value)}
                />
                <TextInput
                  variant='filled'
                  leftSection={<IconBrandTelegram size={16} />}
                  size='md'
                  placeholder='telegram_username'
                  value={prospect.contacts.telegram}
                  onChange={(ev) => handleUpdateProspect(index, 'telegram', ev.currentTarget.value)}
                />
                <TextInput
                  variant='filled'
                  leftSection={<IconBrandWhatsapp size={16} />}
                  size='md'
                  placeholder='+7 (999) 123-45-67'
                  value={prospect.contacts.whatsapp}
                  onChange={(ev) => handleUpdateProspect(index, 'whatsapp', ev.currentTarget.value)}
                />
              </Stack>
            </Card>
          ))}
        </Stack>
      )}

      {error && (
        <Notification
          color='red'
          title='Ошибка'
          radius={'md'}
          onClose={() => setError(null)}
        >
          {error}
        </Notification>
      )}
    </Stack>
  );
};
