import { useEffect, useState, type FC } from 'react';
import { ownerDataProvider, type Owner } from '../../../data';
import { Group, Text, Stack, Grid } from '@mantine/core';
import { AvatarSelector } from '../../../app/components';
import { CONTACT_ICONS, CONTACT_LABELS, CONTACT_LINKS } from './consts';
import React from 'react';

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
      <Grid pl={8}>
        {Object.entries(owner.contacts).map(([key, value]) => (
          <React.Fragment key={key}>
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
          </React.Fragment>
        ))}
      </Grid>
    </Stack>
  );
};
