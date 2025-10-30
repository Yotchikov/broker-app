import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Card,
  Drawer,
  Grid,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { Timeline } from '@mantine/core';
import { prospectDataProvider, type Owner, type Prospect, type ProspectStatus } from '../../../data';
import { useState, type FC } from 'react';
import React from 'react';
import {
  COMMON_DRAWER_PROPS,
  CONTACT_LABELS,
  CONTACT_LINKS,
  PROSPECT_STATUS_ORDER,
  PROSPECT_STATUS_TITLES,
} from './consts';
import { IconChevronDown, IconInfoCircle, IconMoodSad, IconPlus, IconUsers } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import styles from '../main-page.module.css';
import { ProspectListItemMenu } from './prospect-list-item-menu';
import { Carousel } from '@mantine/carousel';

type ProspectListProps = {
  propertyId: string;
  prospects: Prospect[];
};

export const ProspectList: FC<ProspectListProps> = (props) => {
  const { prospects, propertyId } = props;

  const [modalOpened, setModalOpened] = useState(false);
  const [activeProspect, setActiveProspect] = useState<Prospect | null>(null);
  const navigate = useNavigate();

  const noProspectsDisclaimer = (
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
        <IconMoodSad
          size={48}
          stroke={1.8}
        />
        <Text ta='center'>Пока нет клиентов</Text>
      </Stack>
      <Button
        size='md'
        radius='lg'
        leftSection={<IconPlus size={16} />}
        onClick={() => navigate(`/properties/${propertyId}/edit?tab=prospects`)}
      >
        Добавить
      </Button>
    </Stack>
  );

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
    navigate('/');
  };

  const prospectItems = prospects.map((prospect, index) => (
    <React.Fragment key={prospect.id}>
      <Accordion.Item
        key={prospect.id}
        value={prospect.id}
        pr='md'
      >
        <Group
          gap={0}
          wrap='nowrap'
        >
          <Accordion.Control>
            <Group
              gap='sm'
              align='center'
            >
              <Avatar
                size={48}
                radius='lg'
                name={prospect.name}
                color='initials'
              />
              <Text size='md'>{prospect.name}</Text>
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
                    variant='light'
                    size='md'
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
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </React.Fragment>
  ));

  return (
    <Carousel.Slide>
      <Stack gap='xs'>
        <Group
          ml='md'
          gap='xs'
          c='dimmed'
        >
          <IconUsers
            size={20}
            stroke={1.8}
          />
          <Text size='md'>Клиенты</Text>
        </Group>
        <Card
          radius='lg'
          p={0}
        >
          {prospects.length > 0 ? (
            <Accordion
              multiple
              chevronPosition='left'
              variant='unstyled'
              classNames={{ chevron: styles.chevron }}
              styles={{ content: { paddingRight: 0, paddingLeft: 0 } }}
            >
              {prospectItems}
            </Accordion>
          ) : (
            noProspectsDisclaimer
          )}
        </Card>
      </Stack>
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
    </Carousel.Slide>
  );
};
