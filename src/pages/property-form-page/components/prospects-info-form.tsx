import { usePropertyForm } from '../context';
import { Box, Button, Group, Stack, TextInput, Select, ActionIcon, Card, Text, Title } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
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
  const { formData, addProspect, removeProspect, updateProspect, prevStep, submitForm, isLoading, error } =
    usePropertyForm();

  const handleAddProspect = () => {
    addProspect({
      name: '',
      phone: '',
      email: '',
      telegram: '',
      whatsapp: '',
      status: 'inquired',
    });
  };

  const handleUpdateProspect = (index: number, field: string, value: string) => {
    updateProspect(index, { [field]: value });
  };

  return (
    <Stack gap='md'>
      <Group justify='space-between'>
        <Title order={4}>Клиенты</Title>
        <ActionIcon
          variant='transparent'
          color='default'
          onClick={handleAddProspect}
          loading={isLoading}
        >
          <IconPlus size={16} />
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
              withBorder
              p='md'
            >
              <Stack gap='sm'>
                <Group justify='space-between'>
                  <Text fw={500}>Клиент {index + 1}</Text>
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
                  placeholder='Александр Еремеев'
                  value={prospect.name}
                  onChange={(ev) => handleUpdateProspect(index, 'name', ev.currentTarget.value)}
                />

                <TextInput
                  label='Телефон'
                  placeholder='+7 (999) 123-45-67'
                  value={prospect.phone}
                  onChange={(ev) => handleUpdateProspect(index, 'phone', ev.currentTarget.value)}
                />

                <TextInput
                  label='Email'
                  placeholder='alexander@example.com'
                  type='email'
                  value={prospect.email}
                  onChange={(ev) => handleUpdateProspect(index, 'email', ev.currentTarget.value)}
                />

                <Group grow>
                  <TextInput
                    label='Telegram'
                    placeholder='@username'
                    value={prospect.telegram}
                    onChange={(ev) => handleUpdateProspect(index, 'telegram', ev.currentTarget.value)}
                  />
                  <TextInput
                    label='WhatsApp'
                    placeholder='+7 (999) 123-45-67'
                    value={prospect.whatsapp}
                    onChange={(ev) => handleUpdateProspect(index, 'whatsapp', ev.currentTarget.value)}
                  />
                </Group>

                <Select
                  label='Статус'
                  data={prospectStatuses}
                  value={prospect.status}
                  onChange={(value) => handleUpdateProspect(index, 'status', value as ProspectStatus)}
                />
              </Stack>
            </Card>
          ))}
        </Stack>
      )}

      {error && <Box c='red.6'>{error}</Box>}

      <Group justify='space-between'>
        <Button
          variant='light'
          onClick={prevStep}
          disabled={isLoading}
        >
          Назад
        </Button>
        <Button
          onClick={submitForm}
          loading={isLoading}
        >
          {'Создать'}
        </Button>
      </Group>
    </Stack>
  );
};
