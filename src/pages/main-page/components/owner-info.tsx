import { useEffect, useState, type FC } from 'react';
import { ownerDataProvider, type Owner } from '../../../data';
import { Text, Grid, Avatar, Group } from '@mantine/core';
import { CONTACT_ICONS, CONTACT_LINKS } from './consts';
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
    <Grid
      pl={32}
      align='center'
      gutter='xs'
    >
      <Grid.Col span={2}>
        <Avatar
          radius='xl'
          name={owner.name}
          color='initials'
        />
      </Grid.Col>
      <Grid.Col span={10}>
        <Text size='md'>{owner.name}</Text>
      </Grid.Col>
      {Object.entries(owner.contacts).map(([key, value]) => (
        <React.Fragment key={key}>
          {value && (
            <>
              <Grid.Col span={2}>
                <Group
                  justify='flex-end'
                  align='center'
                >
                  {CONTACT_ICONS[key as keyof Owner['contacts']]}
                </Group>
              </Grid.Col>
              <Grid.Col span={10}>
                <a
                  href={`${CONTACT_LINKS[key as keyof Owner['contacts']]}${value}`}
                  key={key}
                  target='_blank'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Text size='md'>{value}</Text>
                </a>
              </Grid.Col>
            </>
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
};
