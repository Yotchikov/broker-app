import { Avatar, Divider, Grid, Group, Stack, Text } from '@mantine/core';
import { prospectDataProvider, type Prospect } from '../../../data';
import { useEffect, useState, type FC } from 'react';
import React from 'react';
import { CONTACT_ICONS, CONTACT_LABELS, CONTACT_LINKS, PROSPECT_STATUS_LABELS } from './consts';
import { IconInfoCircle } from '@tabler/icons-react';

type ProspectListProps = {
  prospectIds: string[];
};

export const ProspectList: FC<ProspectListProps> = (props) => {
  const { prospectIds } = props;

  const [prospects, setProspects] = useState<Prospect[]>([]);

  useEffect(() => {
    Promise.all(prospectIds.map((prospectId) => prospectDataProvider.getProspectById(prospectId))).then(setProspects);
  }, [prospectIds]);

  const cards = prospects.map((prospect, index) => (
    <React.Fragment key={prospect.id}>
      <Stack gap='sm'>
        <Group
          gap='sm'
          align='center'
        >
          <Avatar
            radius='xl'
            name={prospect.name}
            color='initials'
          />
          {prospect.name}
        </Group>
        <Grid pl={8}>
          <Grid.Col span={4}>
            <Group gap='xs'>
              <IconInfoCircle size={16} />
              <Text size='sm'>Статус</Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={8}>{PROSPECT_STATUS_LABELS[prospect.status]}</Grid.Col>
          {Object.entries(prospect.contacts).map(([key, value]) => (
            <React.Fragment key={key}>
              <Grid.Col span={4}>
                <Group gap='xs'>
                  {CONTACT_ICONS[key as keyof Prospect['contacts']]}
                  <Text size='sm'>{CONTACT_LABELS[key as keyof Prospect['contacts']]}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={8}>
                <a
                  href={`${CONTACT_LINKS[key as keyof Prospect['contacts']]}${value}`}
                  key={key}
                  target='_blank'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Text size='sm'>{value}</Text>
                </a>
              </Grid.Col>
            </React.Fragment>
          ))}
        </Grid>
      </Stack>
      {index !== prospects.length - 1 && <Divider />}
    </React.Fragment>
  ));

  return <Stack gap='md'>{cards}</Stack>;
};
