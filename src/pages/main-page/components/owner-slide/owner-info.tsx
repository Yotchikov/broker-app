import { type FC } from 'react';
import { type Owner } from '../../../../data';
import { Text, Group, Stack, Card, Grid, Avatar } from '@mantine/core';
import { CONTACT_LINKS, CONTACT_LABELS } from '../consts';
import React from 'react';
import { IconUser } from '@tabler/icons-react';
import { OwnerMenu } from './owner-menu';

type OwnerInfoProps = {
  owner: Owner | null;
};

export const OwnerInfo: FC<OwnerInfoProps> = ({ owner }) => {
  if (!owner) {
    return null;
  }

  const { name, contacts } = owner;

  return (
    <Card
      radius='lg'
      px='md'
      py='xs'
    >
      <Stack gap={'md'}>
        <Group justify='space-between'>
          <Group
            align='center'
            gap='xs'
          >
            <Avatar
              size={48}
              radius='lg'
              name={owner?.name}
              color='initials'
            >
              <IconUser
                stroke={1.8}
                size={24}
              />
            </Avatar>
            <Text size='md'>{name}</Text>
          </Group>
          <OwnerMenu />
        </Group>
        {Object.entries(contacts).length > 0 && (
          <Grid
            align='center'
            gutter='xs'
          >
            {Object.entries(contacts).map(([key, value]) => (
              <React.Fragment key={key}>
                {value && (
                  <>
                    <Grid.Col span={5}>{CONTACT_LABELS[key as keyof Owner['contacts']]}</Grid.Col>
                    <Grid.Col span={7}>
                      <a
                        href={`${CONTACT_LINKS[key as keyof Owner['contacts']]}${value}`}
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
        )}
      </Stack>
    </Card>
  );
};
