import { usePropertyForm } from '../context';
import { Stack, TextInput, Title, Notification } from '@mantine/core';
import { IconBrandTelegram, IconBrandWhatsapp, IconMail, IconPhone } from '@tabler/icons-react';
import { formatPhoneNumber } from '../../../app/utils/format-phone';
import { ClearButton } from './clear-button';

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
        radius='lg'
        size='md'
        label='Имя'
        placeholder='Иван Иванов'
        required
        value={formData.owner.name}
        onChange={(ev) => updateOwnerInfo({ name: ev.currentTarget.value })}
        rightSection={formData.owner.name ? <ClearButton onClick={() => updateOwnerInfo({ name: '' })} /> : null}
      />
      <Title order={4}>Контакты</Title>
      <TextInput
        radius='lg'
        type='tel'
        size='md'
        placeholder='+7 (999) 123-45-67'
        leftSection={<IconPhone size={16} />}
        value={formData.owner.contacts.phone}
        onChange={(ev) => {
          const formatted = formatPhoneNumber(ev.currentTarget.value);
          updateOwnerInfo({ contacts: { ...formData.owner.contacts, phone: formatted } });
        }}
        rightSection={
          formData.owner.contacts.phone ? (
            <ClearButton onClick={() => updateOwnerInfo({ contacts: { ...formData.owner.contacts, phone: '' } })} />
          ) : null
        }
      />
      <TextInput
        radius='lg'
        type='email'
        size='md'
        placeholder='email@example.com'
        leftSection={<IconMail size={16} />}
        value={formData.owner.contacts.email}
        onChange={(ev) => updateOwnerInfo({ contacts: { ...formData.owner.contacts, email: ev.currentTarget.value } })}
        rightSection={
          formData.owner.contacts.email ? (
            <ClearButton onClick={() => updateOwnerInfo({ contacts: { ...formData.owner.contacts, email: '' } })} />
          ) : null
        }
      />
      <TextInput
        radius='lg'
        type='text'
        size='md'
        leftSection={<IconBrandTelegram size={16} />}
        placeholder='telegram_username'
        value={formData.owner.contacts.telegram}
        onChange={(ev) =>
          updateOwnerInfo({ contacts: { ...formData.owner.contacts, telegram: ev.currentTarget.value } })
        }
        rightSection={
          formData.owner.contacts.telegram ? (
            <ClearButton onClick={() => updateOwnerInfo({ contacts: { ...formData.owner.contacts, telegram: '' } })} />
          ) : null
        }
      />
      <TextInput
        radius='lg'
        type='tel'
        size='md'
        leftSection={<IconBrandWhatsapp size={16} />}
        placeholder='+7 (999) 123-45-67'
        value={formData.owner.contacts.whatsapp}
        onChange={(ev) => {
          const formatted = formatPhoneNumber(ev.currentTarget.value);
          updateOwnerInfo({ contacts: { ...formData.owner.contacts, whatsapp: formatted } });
        }}
        rightSection={
          formData.owner.contacts.whatsapp ? (
            <ClearButton onClick={() => updateOwnerInfo({ contacts: { ...formData.owner.contacts, whatsapp: '' } })} />
          ) : null
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
