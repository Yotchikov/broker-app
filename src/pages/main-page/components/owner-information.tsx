import { useEffect, useState, type FC, type ReactNode } from 'react';
import { ownerDataProvider, type Owner } from '../../../data';
import { Group, Avatar, Text, Stack } from '@mantine/core';
import { IconPhone, IconBrandWhatsapp, IconBrandTelegram, IconAt } from '@tabler/icons-react';

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

const CONTACT_LINKS: Record<keyof Owner['contacts'], string> = {
  phone: 'tel:',
  email: 'mailto:',
  telegram: 'https://t.me/',
  whatsapp: 'https://wa.me/',
};

type OwnerInformationProps = {
  ownerId: string;
};

export const OwnerInformation: FC<OwnerInformationProps> = ({ ownerId }) => {
  const [owner, setOwner] = useState<Owner | null>(null);

  useEffect(() => {
    ownerDataProvider.getOwnerById(ownerId).then(setOwner);
  }, [ownerId]);

  if (!owner) {
    return null;
  }

  return (
    <Group
      wrap='nowrap'
      align='flex-start'
    >
      <Avatar
        name={owner.name}
        size={72}
        radius='md'
        color='initials'
      >
        {owner.emoji}
      </Avatar>
      <Stack gap={'xs'}>
        <Stack gap={0}>
          <Text
            fz='xs'
            tt='uppercase'
            fw={700}
            c='dimmed'
          >
            Собственник
          </Text>
          <Text
            fz='lg'
            fw={500}
          >
            {owner.name}
          </Text>
        </Stack>
        <Stack gap={'4px'}>
          {Object.entries(owner.contacts).map(([key, value]) => (
            <a
              href={`${CONTACT_LINKS[key as keyof Owner['contacts']]}${value}`}
              key={key}
              target='_blank'
            >
              <Group
                wrap='nowrap'
                gap={'xs'}
              >
                {CONTACT_ICONS[key as keyof Owner['contacts']]}
                <Text
                  fz='xs'
                  c='dimmed'
                >
                  {value}
                </Text>
              </Group>
            </a>
          ))}
        </Stack>
      </Stack>
    </Group>
  );
};
