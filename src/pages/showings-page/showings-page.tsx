import { useMemo, useState, type FC } from 'react';
import { Box, Collapse, Container, Group, Stack, Text, Timeline, Title, UnstyledButton } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useLoaderData } from 'react-router';
import type { Property, Prospect, Showing } from '../../data';
import { BOTTOM_NAVBAR_HEIGHT } from '../../app/components';
import { BOTTOM_NAVBAR_BOTTOM_PADDING, BOTTOM_NAVBAR_TOP_PADDING } from '../../app/components/bottom-navbar/consts';
import { ShowingCard, formatDate, formatTime } from './components';

type ShowingsLoaderData = {
  showings: Showing[];
  properties: Property[];
  prospects: (Prospect | null)[];
};

export const ShowingsPage: FC = () => {
  const { showings, properties, prospects } = useLoaderData<ShowingsLoaderData>();
  const [showPastShowings, setShowPastShowings] = useState(false);

  const now = new Date();

  const { upcomingShowings, pastShowings } = useMemo(() => {
    const sortedShowings = [...showings].sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
    );

    const upcoming: Showing[] = [];
    const past: Showing[] = [];

    sortedShowings.forEach((showing) => {
      if (new Date(showing.dateTime) >= now) {
        upcoming.push(showing);
      } else {
        past.push(showing);
      }
    });

    // Sort past showings in reverse order (most recent first)
    past.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());

    return { upcomingShowings: upcoming, pastShowings: past };
  }, [showings]);

  const getProperty = (propertyId: string) => properties.find((p) => p.id === propertyId);
  const getProspect = (prospectId: string) => prospects.find((p) => p?.id === prospectId);

  const hasNoShowings = showings.length === 0;

  return (
    <Container p={0}>
      <Stack
        py='sm'
        px='sm'
        gap='md'
      >
        <Title order={2}>Показы</Title>

        {hasNoShowings && (
          <Text
            c='dimmed'
            ta='center'
            py='xl'
          >
            Пока нет запланированных показов
          </Text>
        )}

        {upcomingShowings.length > 0 && (
          <Stack gap='sm'>
            <Title order={3}>Предстоящие {upcomingShowings.length}</Title>
            <Timeline
              active={upcomingShowings.length - 1}
              bulletSize={28}
            >
              {upcomingShowings.map((showing) => (
                <Timeline.Item
                  key={showing.id}
                  title={
                    <Text
                      fw='bold'
                      size='lg'
                    >
                      {`${formatDate(showing.dateTime)}, ${formatTime(showing.dateTime)}`}
                    </Text>
                  }
                >
                  <ShowingCard
                    key={showing.id}
                    showingId={showing.id}
                    property={getProperty(showing.propertyId)}
                    prospect={getProspect(showing.prospectId)}
                  />
                </Timeline.Item>
              ))}
            </Timeline>
          </Stack>
        )}

        {pastShowings.length > 0 && (
          <Stack gap='sm'>
            <UnstyledButton onClick={() => setShowPastShowings(!showPastShowings)}>
              <Group gap='xs'>
                <Title
                  order={3}
                  c='dimmed'
                >
                  Прошедшие {pastShowings.length}
                </Title>
                <IconChevronDown
                  size={16}
                  color='var(--mantine-color-dimmed)'
                  style={{
                    transition: 'transform 0.2s ease-in-out',
                    transform: showPastShowings ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </Group>
            </UnstyledButton>
            <Collapse in={showPastShowings}>
              <Timeline bulletSize={28}>
                {pastShowings.map((showing) => (
                  <Timeline.Item
                    key={showing.id}
                    title={
                      <Text
                        fw='bold'
                        size='lg'
                      >
                        {`${formatDate(showing.dateTime)}, ${formatTime(showing.dateTime)}`}
                      </Text>
                    }
                    lineVariant='dashed'
                  >
                    <ShowingCard
                      key={showing.id}
                      showingId={showing.id}
                      property={getProperty(showing.propertyId)}
                      prospect={getProspect(showing.prospectId)}
                    />
                  </Timeline.Item>
                ))}
              </Timeline>
            </Collapse>
          </Stack>
        )}
      </Stack>
      <Box h={BOTTOM_NAVBAR_HEIGHT + BOTTOM_NAVBAR_BOTTOM_PADDING + BOTTOM_NAVBAR_TOP_PADDING} />
    </Container>
  );
};
