import { type FC } from 'react';
import { type Owner } from '../../../data';
import { Text, Group, Stack, Card, Grid, Avatar } from '@mantine/core';
import { CONTACT_LINKS, CONTACT_NAMES } from './consts';
import React from 'react';
import { IconUser } from '@tabler/icons-react';

type OwnerInfoProps = {
  owner: Owner | null;
};

export const OwnerInfo: FC<OwnerInfoProps> = ({ owner }) => {
  if (!owner) {
    return null;
  }

  const { name, contacts } = owner;

  return (
    <Stack gap='xs'>
      <Group
        ml='md'
        gap='xs'
        c='dimmed'
      >
        <IconUser
          size={20}
          stroke={1.8}
        />
        <Text size='md'>Собственник</Text>
      </Group>
      <Card
        radius='lg'
        px='md'
        py='xs'
      >
        <Stack gap={'md'}>
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
            <Text
              fw='bold'
              size='lg'
            >
              {name}
            </Text>
          </Group>
          <Grid>
            {Object.entries(contacts).map(([key, value]) => (
              <React.Fragment key={key}>
                {value && (
                  <>
                    <Grid.Col span={5}>{CONTACT_NAMES[key as keyof Owner['contacts']]}</Grid.Col>
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
        </Stack>
      </Card>
    </Stack>
  );
};
