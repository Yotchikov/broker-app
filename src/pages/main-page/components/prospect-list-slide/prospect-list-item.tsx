import { Accordion, Avatar, Badge, Grid, Group, Stack, UnstyledButton, Text, Textarea } from '@mantine/core';
import { IconInfoCircle, IconChevronDown, IconNote } from '@tabler/icons-react';
import React, { useEffect, useState, type FC } from 'react';
import { prospectDataProvider, type Owner, type Prospect } from '../../../../data';
import {
  PROSPECT_STATUS_TITLES,
  CONTACT_LABELS,
  CONTACT_LINKS,
  PROSPECT_STATUS_COLORS,
  PROSPECT_STATUS_ICONS,
} from '../consts';
import { ProspectListItemMenu } from './prospect-list-item-menu';

type ProspectListItemProps = {
  index: number;
  prospect: Prospect;
  openStatusModal: (prospect: Prospect) => void;
};

export const ProspectListItem: FC<ProspectListItemProps> = (props) => {
  const { index, prospect, openStatusModal } = props;

  const [note, setNote] = useState('');

  useEffect(() => {
    prospectDataProvider.getProspectById(prospect.id).then((prospect) => {
      setNote(prospect.note || '');
    });
  }, [prospect.id]);

  const handleNoteChange = async (note: string) => {
    setNote(note);
    await prospectDataProvider.updateProspect({ id: prospect.id, note });
  };

  return (
    <Accordion.Item
      key={prospect.id}
      value={prospect.id}
    >
      <Group
        gap={0}
        wrap='nowrap'
        pr='md'
      >
        <Accordion.Control>
          <Group
            gap='sm'
            align='center'
            style={{ opacity: prospect.status === 'canceled' ? 0.5 : 1 }}
          >
            <Avatar
              size={48}
              radius='lg'
              name={prospect.name}
              color='initials'
            />
            <Group gap={'xs'}>
              <Text size='md'>{prospect.name}</Text>
              <Avatar
                color={PROSPECT_STATUS_COLORS[prospect.status]}
                radius='xl'
                size={24}
              >
                {PROSPECT_STATUS_ICONS[prospect.status]}
              </Avatar>
            </Group>
          </Group>
        </Accordion.Control>
        <ProspectListItemMenu prospectIndex={index} />
      </Group>
      <Accordion.Panel>
        <Stack
          gap='md'
          px='md'
          py='xs'
        >
          <Grid
            align='center'
            gutter='xs'
          >
            <Grid.Col span={5}>
              <Group
                gap='xs'
                c='dimmed'
                wrap='nowrap'
                align='center'
              >
                <IconInfoCircle
                  stroke={1.8}
                  size={20}
                  color='var(--mantine-color-dimmed)'
                />
                <Text size='md'>Статус</Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={7}>
              <UnstyledButton onClick={() => openStatusModal(prospect)}>
                <Badge
                  rightSection={<IconChevronDown size={12} />}
                  leftSection={PROSPECT_STATUS_ICONS[prospect.status]}
                  variant='light'
                  size={'md'}
                  color={PROSPECT_STATUS_COLORS[prospect.status]}
                >
                  {PROSPECT_STATUS_TITLES[prospect.status]}
                </Badge>
              </UnstyledButton>
            </Grid.Col>
            {Object.entries(prospect.contacts).map(([key, value]) => (
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
          <Stack gap='xs'>
            <Group
              gap='xs'
              c='dimmed'
            >
              <IconNote
                size={20}
                stroke={1.8}
              />
              <Text size='md'>Заметки по клиенту</Text>
            </Group>
            <Textarea
              radius='lg'
              placeholder='Например: договорились о встрече, хочет скидку, и т.д.'
              autosize
              size='md'
              value={note}
              minRows={3}
              maxRows={10}
              onChange={(ev) => handleNoteChange(ev.currentTarget.value)}
            />
          </Stack>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
