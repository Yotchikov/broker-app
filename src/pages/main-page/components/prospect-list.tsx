import { Avatar, Badge, Button, Divider, Drawer, Grid, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import { Timeline } from '@mantine/core';
import { prospectDataProvider, type Prospect, type ProspectStatus } from '../../../data';
import { useEffect, useState, type FC } from 'react';
import React from 'react';
import { CONTACT_ICONS, CONTACT_LABELS, CONTACT_LINKS, PROSPECT_STATUS_ORDER, PROSPECT_STATUS_TITLES } from './consts';
import { IconChevronDown, IconInfoCircle, IconMoodSad, IconPlus, IconUsersPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

type ProspectListProps = {
  propertyId: string;
  prospectIds: string[];
};

export const ProspectList: FC<ProspectListProps> = (props) => {
  const { prospectIds, propertyId } = props;

  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [activeProspect, setActiveProspect] = useState<Prospect | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all(prospectIds.map((prospectId) => prospectDataProvider.getProspectById(prospectId))).then(setProspects);
  }, [prospectIds]);

  if (prospects.length === 0) {
    return (
      <Stack
        p='xl'
        align='center'
        gap='md'
        c='dimmed'
      >
        <IconMoodSad size={48} />
        <Text ta='center'>Пока нет клиентов</Text>
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

    setProspects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setModalOpened(false);
    setActiveProspect(null);
  };

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
          <Grid.Col span={8}>
            <UnstyledButton
              display='flex'
              onClick={() => openStatusModal(prospect)}
            >
              <Badge
                rightSection={<IconChevronDown size={12} />}
                variant='light'
              >
                {PROSPECT_STATUS_TITLES[prospect.status]}
              </Badge>
            </UnstyledButton>
          </Grid.Col>
          {Object.entries(prospect.contacts).map(([key, value]) => (
            <React.Fragment key={key}>
              {value && (
                <>
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
                </>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Stack>
      {index !== prospects.length - 1 && <Divider />}
    </React.Fragment>
  ));

  return (
    <>
      <Stack gap='md'>{cards}</Stack>
      <Drawer
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setActiveProspect(null);
        }}
        position='bottom'
        size='md'
        title={'Изменение статуса'}
        radius='md'
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
