import { Card, Group, Stack, Text, Divider } from '@mantine/core';
import type { FC } from 'react';
import type { Property } from '../../../../data';
import { IconLink } from '@tabler/icons-react';
import { LINK_LABELS } from '../consts';
import React from 'react';

type PropertyLinksProps = {
  links: Property['links'];
};

export const PropertyLinks: FC<PropertyLinksProps> = (props) => {
  const { links } = props;

  if (!links || Object.keys(links).length === 0 || Object.values(links).every((value) => !value)) {
    return null;
  }

  return (
    <Stack gap='4'>
      <Group
        ml='md'
        gap='xs'
        c='dimmed'
      >
        <IconLink
          size={20}
          stroke={1.8}
        />
        <Text size='md'>Ссылки</Text>
      </Group>
      <Card
        radius='lg'
        px='md'
        py='xs'
      >
        <Stack gap='xs'>
          {Object.entries(links).map(([key, value], index) =>
            value ? (
              <React.Fragment key={key}>
                <a
                  href={value}
                  target='_blank'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {LINK_LABELS[key as keyof Property['links']]}
                </a>
                {index < Object.values(links).filter((value) => value).length - 1 && <Divider ml={30} />}
              </React.Fragment>
            ) : null,
          )}
        </Stack>
      </Card>
    </Stack>
  );
};
