import { useEffect, useState, type FC } from 'react';
import { ownerDataProvider, type Owner } from '../../../data';
import { Group, Text, Stack, Grid, Avatar } from '@mantine/core';
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
        <Avatar
          radius='xl'
          name={owner.name}
          color='initials'
        />
        <Text size='md'>{owner.name}</Text>
      </Group>
      <Grid pl={8}>
        {Object.entries(owner.contacts).map(([key, value]) => (
          <React.Fragment key={key}>
            {value && (
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
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Text size='sm'>{value}</Text>
                  </a>
                </Grid.Col>
              </>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Stack>
  );
};
