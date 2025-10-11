import { usePropertyForm } from '../context';
import { Stack, TextInput, Title, Notification } from '@mantine/core';
import { IconBrandTelegram, IconBrandWhatsapp, IconMail, IconPhone } from '@tabler/icons-react';

type OwnerInfoFormProps = {
  withTitle?: boolean;
};

export const OwnerInfoForm = (props: OwnerInfoFormProps) => {
  const { withTitle = true } = props;

  const { formData, updateOwnerInfo, error, setError } = usePropertyForm();

  return (
    <Stack gap='md'>
      {withTitle && <Title order={3}>Собственник</Title>}
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
        type='tel'
        size='md'
        variant='filled'
        placeholder='+7 (999) 123-45-67'
        leftSection={<IconPhone size={16} />}
        value={formData.owner.contacts.phone}
        onChange={(ev) => updateOwnerInfo({ contacts: { ...formData.owner.contacts, phone: ev.currentTarget.value } })}
      />
      <TextInput
        type='email'
        size='md'
        variant='filled'
        placeholder='email@example.com'
        leftSection={<IconMail size={16} />}
        value={formData.owner.contacts.email}
        onChange={(ev) => updateOwnerInfo({ contacts: { ...formData.owner.contacts, email: ev.currentTarget.value } })}
      />
      <TextInput
        type='text'
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
        type='tel'
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
  );
};
