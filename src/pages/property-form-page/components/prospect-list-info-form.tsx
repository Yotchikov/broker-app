import { useState } from 'react';
import { usePropertyForm } from '../context';
import { Box, Group, Stack, ActionIcon, Card, Text, Title, Notification, Modal, Button } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import type { Prospect } from 'data';
import { ProspectInfoForm } from './prospect-info-form';

export const ProspectListInfoForm = () => {
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
              color='var(--mantine-color-dimmed)'
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
                      Клиент {formData.prospects.length - index}
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
                  <ProspectInfoForm
                    prospect={prospect}
                    handleUpdateProspect={(field, value) => handleUpdateProspect(index, field, value)}
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
