import { useEffect, useState, type FC, type ReactNode } from 'react';
import { ownerDataProvider, type Owner } from '../../../data';
import { Group, Text, Stack, Grid } from '@mantine/core';
import { IconPhone, IconBrandWhatsapp, IconBrandTelegram, IconAt } from '@tabler/icons-react';
import { AvatarSelector } from '../../../app/components';

const CONTACT_ICONS: Record<keyof Owner['contacts'], ReactNode> = {
  phone: (
    <IconPhone
      color='grey'
      size={16}
    />
  ),
  email: (
    <IconAt
      color='grey'
      size={16}
    />
  ),
  telegram: (
    <IconBrandTelegram
      color='grey'
      size={16}
    />
  ),
  whatsapp: (
    <IconBrandWhatsapp
      color='grey'
      size={16}
    />
  ),
};

const CONTACT_LABELS: Record<keyof Owner['contacts'], string> = {
  phone: 'Телефон',
  email: 'Email',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
};

const CONTACT_LINKS: Record<keyof Owner['contacts'], string> = {
  phone: 'tel:',
  email: 'mailto:',
  telegram: 'https://t.me/',
  whatsapp: 'https://wa.me/',
};

type OwnerInfoProps = {
  ownerId: string;
};

export const OwnerInfo: FC<OwnerInfoProps> = ({ ownerId }) => {
  const [owner, setOwner] = useState<Owner | null>(null);

  useEffect(() => {
    ownerDataProvider.getOwnerById(ownerId).then(setOwner);
  }, [ownerId]);

  if (!owner) {
    return null;
  }

  return (
    <Stack gap='sm'>
      <Group
        gap='sm'
        align='center'
      >
        <AvatarSelector
          selectedAvatar={owner.avatar}
          onAvatarSelect={() => {
            // TODO: Implement avatar select
          }}
          size={48}
        />
        {owner.name}
      </Group>
      <Grid pl={16}>
        {Object.entries(owner.contacts).map(([key, value]) => (
          <>
            <Grid.Col span={4}>
              <Group gap='xs'>
                {CONTACT_ICONS[key as keyof Owner['contacts']]}
                <Text size='sm'>{CONTACT_LABELS[key as keyof Owner['contacts']]}</Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={8}>
              <a
                href={`${CONTACT_LINKS[key as keyof Owner['contacts']]}${value}`}
                key={key}
                target='_blank'
              >
                <Text size='sm'>{value}</Text>
              </a>
            </Grid.Col>
          </>
        ))}
      </Grid>
    </Stack>
  );
};
