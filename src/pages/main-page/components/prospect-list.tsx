import { ActionIcon, Avatar, Badge, Button, Divider, Drawer, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import { Timeline } from '@mantine/core';
import { prospectDataProvider, type Prospect, type ProspectStatus } from '../../../data';
import { useState, type FC } from 'react';
import React from 'react';
import {
  COMMON_DRAWER_PROPS,
  CONTACT_ICONS,
  CONTACT_LINKS,
  PROSPECT_STATUS_ORDER,
  PROSPECT_STATUS_TITLES,
} from './consts';
import { IconChevronDown, IconDots, IconInfoCircle, IconMoodSad, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

type ProspectListProps = {
  propertyId: string;
  prospects: Prospect[];
};

export const ProspectList: FC<ProspectListProps> = (props) => {
  const { prospects, propertyId } = props;

  const [modalOpened, setModalOpened] = useState(false);
  const [activeProspect, setActiveProspect] = useState<Prospect | null>(null);
  const navigate = useNavigate();

  if (prospects.length === 0) {
    return (
      <Stack
        p='xl'
        align='center'
        gap='xl'
        c='dimmed'
      >
        <Stack
          align='center'
          gap='xs'
        >
          <IconMoodSad size={48} />
          <Text ta='center'>Пока нет клиентов</Text>
        </Stack>
        <Button
          size='md'
          radius='xl'
          leftSection={<IconPlus size={16} />}
          onClick={() => navigate(`/properties/${propertyId}/edit?tab=prospects`)}
        >
          Добавить
        </Button>
      </Stack>
    );
  }

  const openStatusModal = (prospect: Prospect) => {
    setActiveProspect(prospect);
    setModalOpened(true);
  };

  const handleSelectStatus = async (status: ProspectStatus) => {
    if (!activeProspect) return;

    const updated: Prospect = { ...activeProspect, status };
    await prospectDataProvider.updateProspect(updated);

    setModalOpened(false);
    setActiveProspect(null);
  };

  const cards = prospects.map((prospect, index) => (
    <React.Fragment key={prospect.id}>
      <Stack
        gap='md'
        pl={32}
      >
        <Group
          gap='sm'
          align='center'
          justify='space-between'
        >
          <Group
            gap='sm'
            align='center'
          >
            <Avatar
              radius='xl'
              size={36}
              name={prospect.name}
              color='initials'
            />
            <Text size='md'>{prospect.name}</Text>
          </Group>
          <ActionIcon
            variant='transparent'
            color='default'
            onClick={() => navigate(`/properties/${propertyId}/edit?tab=prospects`)}
          >
            <IconDots
              stroke={1.8}
              size={20}
            />
          </ActionIcon>
        </Group>
        <Group
          gap='md'
          align='center'
        >
          <IconInfoCircle
            stroke={1.8}
            size={20}
            color='var(--mantine-color-dimmed)'
          />
          <UnstyledButton
            display='flex'
            onClick={() => openStatusModal(prospect)}
          >
            <Badge
              rightSection={<IconChevronDown size={12} />}
              variant='light'
              size='md'
            >
              {PROSPECT_STATUS_TITLES[prospect.status]}
            </Badge>
          </UnstyledButton>
        </Group>
        {Object.entries(prospect.contacts).map(([key, value]) => (
          <React.Fragment key={key}>
            {value && (
              <Group
                gap='md'
                align='center'
              >
                {CONTACT_ICONS[key as keyof Prospect['contacts']]}
                <a
                  href={`${CONTACT_LINKS[key as keyof Prospect['contacts']]}${value}`}
                  key={key}
                  target='_blank'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Text size='md'>{value}</Text>
                </a>
              </Group>
            )}
          </React.Fragment>
        ))}
      </Stack>
      {index !== prospects.length - 1 && <Divider ml={68} />}
    </React.Fragment>
  ));

  return (
    <>
      <Stack gap='md'>{cards}</Stack>
      <Drawer
        {...COMMON_DRAWER_PROPS}
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setActiveProspect(null);
        }}
        title={
          <Text
            size='xl'
            fw='bold'
          >
            Изменить статус
          </Text>
        }
      >
        <Timeline
          active={activeProspect ? PROSPECT_STATUS_ORDER.indexOf(activeProspect.status) : -1}
          bulletSize={18}
        >
          {PROSPECT_STATUS_ORDER.map((status) => (
            <Timeline.Item
              key={status}
              title={PROSPECT_STATUS_TITLES[status]}
              onClick={() => handleSelectStatus(status)}
            />
          ))}
        </Timeline>
      </Drawer>
    </>
  );
};
