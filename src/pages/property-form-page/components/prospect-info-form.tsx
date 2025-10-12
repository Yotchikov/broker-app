import { Stack, Title, TextInput, NativeSelect } from '@mantine/core';
import { IconPhone, IconMail, IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-react';
import type { Prospect, ProspectStatus } from '../../../data';
import { PROSPECT_STATUS_TITLES } from '../../main-page/components/consts';

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
        variant='filled'
        placeholder='Александр Еремеев'
        required
        value={prospect.name}
        onChange={(ev) => handleUpdateProspect('name', ev.currentTarget.value)}
      />
      <NativeSelect
        label='Статус'
        size='md'
        variant='filled'
        data={prospectStatuses}
        value={prospect.status}
        onChange={(event) => handleUpdateProspect('status', event.currentTarget.value as ProspectStatus)}
      />
      <Title order={4}>Контакты</Title>
      <TextInput
        size='md'
        variant='filled'
        leftSection={<IconPhone size={16} />}
        placeholder='+7 (999) 123-45-67'
        value={prospect.contacts.phone}
        onChange={(ev) => handleUpdateProspect('contacts', { ...prospect.contacts, phone: ev.currentTarget.value })}
      />

      <TextInput
        size='md'
        variant='filled'
        leftSection={<IconMail size={16} />}
        placeholder='email@example.com'
        type='email'
        value={prospect.contacts.email}
        onChange={(ev) => handleUpdateProspect('contacts', { ...prospect.contacts, email: ev.currentTarget.value })}
      />
      <TextInput
        variant='filled'
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
      />
      <TextInput
        variant='filled'
        leftSection={<IconBrandWhatsapp size={16} />}
        size='md'
        placeholder='+7 (999) 123-45-67'
        value={prospect.contacts.whatsapp}
        onChange={(ev) =>
          handleUpdateProspect('contacts', {
            ...prospect.contacts,
            whatsapp: ev.currentTarget.value,
          })
        }
      />
    </Stack>
  );
};
