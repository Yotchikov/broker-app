import { usePropertyForm } from '../context';
import { Stack, TextInput, Title, Notification } from '@mantine/core';
import { AvatarSelector } from '../../../app/components';
import { IconBrandTelegram, IconBrandWhatsapp, IconMail, IconPhone } from '@tabler/icons-react';

export const OwnerInfoForm = () => {
  const { formData, updateOwnerInfo, error, setError } = usePropertyForm();

  const handleAvatarSelect = (avatarPath: string) => {
    updateOwnerInfo({ avatar: avatarPath });
  };

  return (
    <Stack gap='md'>
      <Title order={3}>Собственник</Title>
      <AvatarSelector
        selectedAvatar={formData.owner.avatar}
        onAvatarSelect={handleAvatarSelect}
        size={80}
      />
      <TextInput
        size='md'
        variant='filled'
        label='Имя'
        placeholder='Иван Иванов'
        required
        value={formData.owner.name}
        onChange={(ev) => updateOwnerInfo({ name: ev.currentTarget.value })}
      />
      <Title order={4}>Контакты</Title>
      <TextInput
        size='md'
        variant='filled'
        placeholder='+7 (999) 123-45-67'
        leftSection={<IconPhone size={16} />}
        value={formData.owner.contacts.phone}
        onChange={(ev) => updateOwnerInfo({ contacts: { ...formData.owner.contacts, phone: ev.currentTarget.value } })}
      />
      <TextInput
        size='md'
        variant='filled'
        placeholder='ivan@example.com'
        type='email'
        leftSection={<IconMail size={16} />}
        value={formData.owner.contacts.email}
        onChange={(ev) => updateOwnerInfo({ contacts: { ...formData.owner.contacts, email: ev.currentTarget.value } })}
      />
      <TextInput
        size='md'
        variant='filled'
        leftSection={<IconBrandTelegram size={16} />}
        placeholder='telegram_username'
        value={formData.owner.contacts.telegram}
        onChange={(ev) =>
          updateOwnerInfo({ contacts: { ...formData.owner.contacts, telegram: ev.currentTarget.value } })
        }
      />
      <TextInput
        size='md'
        variant='filled'
        leftSection={<IconBrandWhatsapp size={16} />}
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
    </Stack>
  );
};
