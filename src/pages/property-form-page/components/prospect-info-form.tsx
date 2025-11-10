import { Stack, Title, TextInput, NativeSelect } from '@mantine/core';
import { IconPhone, IconMail, IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-react';
import type { Prospect, ProspectStatus } from '../../../data';
import { PROSPECT_STATUS_TITLES } from '../../main-page/components/consts';
import { formatPhoneNumber } from '../../../app/utils/format-phone';
import { ClearButton } from './clear-button';

type ProspectInfoFormProps = {
  handleUpdateProspect: (field: keyof Prospect, value: Prospect[keyof Prospect]) => void;
  prospect?: Prospect;
};

const prospectStatuses: Array<{ value: ProspectStatus; label: string }> = Object.entries(PROSPECT_STATUS_TITLES).map(
  ([status, label]) => ({
    value: status as ProspectStatus,
    label: label,
  }),
);

export const ProspectInfoForm = (props: ProspectInfoFormProps) => {
  const { prospect, handleUpdateProspect } = props;

  if (!prospect) {
    return null;
  }

  return (
    <Stack gap='md'>
      <TextInput
        label='Имя'
        size='md'
        radius='lg'
        placeholder='Александр Еремеев'
        required
        value={prospect.name}
        onChange={(ev) => handleUpdateProspect('name', ev.currentTarget.value)}
        rightSection={prospect.name ? <ClearButton onClick={() => handleUpdateProspect('name', '')} /> : null}
      />
      <NativeSelect
        label='Статус'
        size='md'
        radius='lg'
        data={prospectStatuses}
        value={prospect.status}
        onChange={(event) => handleUpdateProspect('status', event.currentTarget.value as ProspectStatus)}
      />
      <Title order={4}>Контакты</Title>
      <TextInput
        size='md'
        radius='lg'
        leftSection={<IconPhone size={16} />}
        placeholder='+7 (999) 123-45-67'
        value={prospect.contacts.phone}
        onChange={(ev) => {
          const formatted = formatPhoneNumber(ev.currentTarget.value);
          handleUpdateProspect('contacts', { ...prospect.contacts, phone: formatted });
        }}
        rightSection={
          prospect.contacts.phone ? (
            <ClearButton onClick={() => handleUpdateProspect('contacts', { ...prospect.contacts, phone: '' })} />
          ) : null
        }
      />

      <TextInput
        size='md'
        radius='lg'
        leftSection={<IconMail size={16} />}
        placeholder='email@example.com'
        type='email'
        value={prospect.contacts.email}
        onChange={(ev) => handleUpdateProspect('contacts', { ...prospect.contacts, email: ev.currentTarget.value })}
        rightSection={
          prospect.contacts.email ? (
            <ClearButton onClick={() => handleUpdateProspect('contacts', { ...prospect.contacts, email: '' })} />
          ) : null
        }
      />
      <TextInput
        radius='lg'
        leftSection={<IconBrandTelegram size={16} />}
        size='md'
        placeholder='telegram_username'
        value={prospect.contacts.telegram}
        onChange={(ev) =>
          handleUpdateProspect('contacts', {
            ...prospect.contacts,
            telegram: ev.currentTarget.value,
          })
        }
        rightSection={
          prospect.contacts.telegram ? (
            <ClearButton onClick={() => handleUpdateProspect('contacts', { ...prospect.contacts, telegram: '' })} />
          ) : null
        }
      />
      <TextInput
        radius='lg'
        leftSection={<IconBrandWhatsapp size={16} />}
        size='md'
        placeholder='+7 (999) 123-45-67'
        value={prospect.contacts.whatsapp}
        onChange={(ev) => {
          const formatted = formatPhoneNumber(ev.currentTarget.value);
          handleUpdateProspect('contacts', { ...prospect.contacts, whatsapp: formatted });
        }}
        rightSection={
          prospect.contacts.whatsapp ? (
            <ClearButton onClick={() => handleUpdateProspect('contacts', { ...prospect.contacts, whatsapp: '' })} />
          ) : null
        }
      />
    </Stack>
  );
};
