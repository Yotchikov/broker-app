import { usePropertyForm } from '../context';
import { Button, Group, Stack, TextInput, Title, Notification } from '@mantine/core';
import { AvatarSelector } from '../../../app/components';

export const OwnerInfoForm = () => {
  const { formData, updateOwnerInfo, nextStep, prevStep, isLoading: loading, error, setError } = usePropertyForm();

  const handleAvatarSelect = (avatarPath: string) => {
    updateOwnerInfo({ avatar: avatarPath });
  };

  return (
    <Stack gap='md'>
      <Title order={4}>Собственник</Title>
      <AvatarSelector
        selectedAvatar={formData.owner.avatar}
        onAvatarSelect={handleAvatarSelect}
        size={80}
      />
      <TextInput
        label='Имя'
        placeholder='Иван Иванов'
        required
        value={formData.owner.name}
        onChange={(ev) => updateOwnerInfo({ name: ev.currentTarget.value })}
      />
      <TextInput
        label='Телефон'
        placeholder='+7 (999) 123-45-67'
        value={formData.owner.contacts.phone}
        onChange={(ev) => updateOwnerInfo({ contacts: { ...formData.owner.contacts, phone: ev.currentTarget.value } })}
      />
      <TextInput
        label='Email'
        placeholder='ivan@example.com'
        type='email'
        value={formData.owner.contacts.email}
        onChange={(ev) => updateOwnerInfo({ contacts: { ...formData.owner.contacts, email: ev.currentTarget.value } })}
      />
      <TextInput
        label='Telegram'
        placeholder='@username'
        value={formData.owner.contacts.telegram}
        onChange={(ev) =>
          updateOwnerInfo({ contacts: { ...formData.owner.contacts, telegram: ev.currentTarget.value } })
        }
      />
      <TextInput
        label='WhatsApp'
        placeholder='+7 (999) 123-45-67'
        value={formData.owner.contacts.whatsapp}
        onChange={(ev) =>
          updateOwnerInfo({ contacts: { ...formData.owner.contacts, whatsapp: ev.currentTarget.value } })
        }
      />
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
      <Group justify='space-between'>
        <Button
          variant='light'
          onClick={prevStep}
          disabled={loading}
        >
          Назад
        </Button>
        <Button
          onClick={nextStep}
          disabled={loading}
        >
          Далее
        </Button>
      </Group>
    </Stack>
  );
};
