import { Accordion, Card, Drawer, Group, Stack, Text } from '@mantine/core';
import { Timeline } from '@mantine/core';
import { prospectDataProvider, type Prospect, type ProspectStatus } from '../../../../data';
import { useState, type FC } from 'react';
import { COMMON_DRAWER_PROPS, PROSPECT_STATUS_ORDER, PROSPECT_STATUS_TITLES } from '../consts';
import { IconUsers } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import styles from '../../main-page.module.css';
import { ProspectListEmptyDisclaimer } from './prospect-list-empty-disclaimer';
import { ProspectListItem } from './prospect-list-item';

type ProspectListProps = {
  prospects: Prospect[];
};

export const ProspectList: FC<ProspectListProps> = (props) => {
  const { prospects } = props;

  const [modalOpened, setModalOpened] = useState(false);
  const [activeProspect, setActiveProspect] = useState<Prospect | null>(null);
  const navigate = useNavigate();

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
    <ProspectListItem
      key={prospect.id}
      index={index}
      prospect={prospect}
      openStatusModal={openStatusModal}
    />
  ));

  return (
    <>
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
              styles={{ content: { padding: '0' } }}
            >
              {prospectItems}
            </Accordion>
          ) : (
            <ProspectListEmptyDisclaimer />
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
    </>
  );
};
