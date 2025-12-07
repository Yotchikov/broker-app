import { Accordion, Button, Card, Drawer, Text } from '@mantine/core';
import { Timeline } from '@mantine/core';
import { prospectDataProvider, type Prospect, type ProspectStatus } from '../../../../data';
import { useState, type FC } from 'react';
import { COMMON_DRAWER_PROPS, PROSPECT_STATUS_ORDER, PROSPECT_STATUS_TITLES } from '../consts';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import styles from '../../main-page.module.css';
import { ProspectListItem } from './prospect-list-item';
import { AddProspectModal } from './add-prospect-modal';
import { EmptyDisclaimer } from '../../../../app/components';

type ProspectListProps = {
  prospects: Prospect[];
};

export const ProspectList: FC<ProspectListProps> = (props) => {
  const { prospects } = props;

  const [modalOpened, setModalOpened] = useState(false);
  const [activeProspect, setActiveProspect] = useState<Prospect | null>(null);
  const [isAddProspectModalOpened, setIsAddProspectModalOpened] = useState(false);
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

  const emptyProspectList = (
    <Card
      radius='lg'
      p={0}
    >
      <EmptyDisclaimer
        title='У этого объекта пока нет клиентов'
        description={
          <>
            Добавьте первого клиента, и он
            <br />
            появится здесь
          </>
        }
        button={
          <Button
            size='md'
            radius='lg'
            leftSection={
              <IconPlus
                size={16}
                stroke={1.8}
              />
            }
            onClick={() => setIsAddProspectModalOpened(true)}
            variant='light'
            fullWidth
          >
            Добавить клиента
          </Button>
        }
      />
    </Card>
  );

  return (
    <>
      {prospects.length === 0 ? (
        emptyProspectList
      ) : (
        <>
          <Card
            radius='lg'
            p={0}
          >
            <Accordion
              multiple
              chevronPosition='left'
              variant='unstyled'
              classNames={{ chevron: styles.chevron }}
              styles={{ content: { padding: '0' } }}
            >
              {prospectItems}
            </Accordion>
            <Button
              size='md'
              radius='lg'
              leftSection={
                <IconPlus
                  size={16}
                  stroke={1.8}
                />
              }
              onClick={() => setIsAddProspectModalOpened(true)}
              variant='light'
              mx='md'
              my='xs'
            >
              Добавить клиента
            </Button>
          </Card>
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
      )}
      <AddProspectModal
        opened={isAddProspectModalOpened}
        onClose={() => setIsAddProspectModalOpened(false)}
      />
    </>
  );
};
