import { useState } from 'react';
import { usePropertyForm } from '../context';
import {
  Box,
  Group,
  Stack,
  TextInput,
  ActionIcon,
  Card,
  Text,
  Title,
  Notification,
  NativeSelect,
  Modal,
  Button,
} from '@mantine/core';
import { IconBrandTelegram, IconBrandWhatsapp, IconMail, IconPhone, IconPlus, IconTrash } from '@tabler/icons-react';
import type { Prospect, ProspectStatus } from 'data';

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

  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddProspect = () => {
    addProspect({
      id: crypto.randomUUID(),
      name: '',
      status: 'inquired',
      contacts: {},
    });
  };

  const handleUpdateProspect = (index: number, field: keyof Prospect, value: Prospect[keyof Prospect]) => {
    updateProspect(index, { [field]: value });
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget === null) return;

    try {
      setIsDeleting(true);
      removeProspect(deleteTarget);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Modal
        opened={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title='Удалить клиента?'
        centered
      >
        <Stack gap='md'>
          <Text>
            Это действие нельзя отменить. Подтвердите удаление клиента "
            {formData.prospects[deleteTarget || 0]?.name || 'Клиент'}".
          </Text>
          <Group justify='flex-end'>
            <Button
              color='gray'
              variant='transparent'
              onClick={() => setDeleteTarget(null)}
              disabled={isDeleting}
            >
              Отмена
            </Button>
            <Button
              variant='light'
              color='red'
              onClick={handleConfirmDelete}
              loading={isDeleting}
            >
              Удалить
            </Button>
          </Group>
        </Stack>
      </Modal>
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
            <IconPlus
              stroke={1.8}
              size={24}
            />
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
                radius='lg'
                withBorder
              >
                <Stack gap='sm'>
                  <Group justify='space-between'>
                    <Title
                      size='lg'
                      order={4}
                    >
                      Клиент {index + 1}
                    </Title>
                    <ActionIcon
                      color='red'
                      variant='transparent'
                      onClick={() => setDeleteTarget(index)}
                      loading={isLoading}
                    >
                      <IconTrash
                        stroke={1.8}
                        size={24}
                      />
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
                    onChange={(ev) =>
                      handleUpdateProspect(index, 'contacts', { ...prospect.contacts, phone: ev.currentTarget.value })
                    }
                  />

                  <TextInput
                    size='md'
                    variant='filled'
                    leftSection={<IconMail size={16} />}
                    placeholder='email@example.com'
                    type='email'
                    value={prospect.contacts.email}
                    onChange={(ev) =>
                      handleUpdateProspect(index, 'contacts', { ...prospect.contacts, email: ev.currentTarget.value })
                    }
                  />
                  <TextInput
                    variant='filled'
                    leftSection={<IconBrandTelegram size={16} />}
                    size='md'
                    placeholder='telegram_username'
                    value={prospect.contacts.telegram}
                    onChange={(ev) =>
                      handleUpdateProspect(index, 'contacts', {
                        ...prospect.contacts,
                        telegram: ev.currentTarget.value,
                      })
                    }
                  />
                  <TextInput
                    variant='filled'
                    leftSection={<IconBrandWhatsapp size={16} />}
                    size='md'
                    placeholder='+7 (999) 123-45-67'
                    value={prospect.contacts.whatsapp}
                    onChange={(ev) =>
                      handleUpdateProspect(index, 'contacts', {
                        ...prospect.contacts,
                        whatsapp: ev.currentTarget.value,
                      })
                    }
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
            pos='absolute'
            bottom={76 * 2}
            left={16}
            right={16}
            style={{ zIndex: 150 }}
          >
            {error}
          </Notification>
        )}
      </Stack>
    </>
  );
};
