import { type FC } from 'react';
import { type Owner } from '../../../data';
import { Text, Group, Stack } from '@mantine/core';
import { CONTACT_ICONS, CONTACT_LINKS } from './consts';
import React from 'react';

type OwnerInfoProps = {
  owner: Owner | null;
};

export const OwnerInfo: FC<OwnerInfoProps> = ({ owner }) => {
  if (!owner) {
    return null;
  }

  return (
    <Stack
      pl={32}
      gap={'md'}
    >
      {Object.entries(owner.contacts).map(([key, value]) => (
        <React.Fragment key={key}>
          {value && (
            <>
              <Group
                align='center'
                gap='md'
              >
                {CONTACT_ICONS[key as keyof Owner['contacts']]}
                <a
                  href={`${CONTACT_LINKS[key as keyof Owner['contacts']]}${value}`}
                  key={key}
                  target='_blank'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Text size='md'>{value}</Text>
                </a>
              </Group>
            </>
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
};
