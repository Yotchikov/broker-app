import { useRef, type FC } from 'react';
import { ActionIcon, Avatar, Card, Group, Stack, Text } from '@mantine/core';
import { IconBuilding, IconDots, IconUser } from '@tabler/icons-react';
import type { Property, Prospect } from '../../../data';
import { ShowingMenu } from './showing-menu';

type ShowingCardProps = {
  showingId: string;
  property?: Property;
  prospect?: Prospect | null;
};

export const ShowingCard: FC<ShowingCardProps> = (props) => {
  const { showingId, property, prospect } = props;
  const showingMenuRef = useRef<{ openMenu: () => void }>(null);

  const propertyName = property?.name || 'Неизвестный объект';
  const prospectName = prospect?.name || 'Неизвестный клиент';

  return (
    <Card
      radius='lg'
      px='md'
      py='xs'
    >
      <Stack gap={'md'}>
        <Group justify='space-between'>
          <Group
            align='center'
            gap='xs'
          >
            <Avatar
              size={48}
              radius='lg'
              name={propertyName}
              color='initials'
            >
              <IconBuilding
                stroke={1.8}
                size={24}
              />
            </Avatar>
            <Text size='md'>{propertyName}</Text>
          </Group>
          <ActionIcon
            variant='transparent'
            color='default'
            onClick={() => showingMenuRef.current?.openMenu()}
          >
            <IconDots
              stroke={1.8}
              size={20}
            />
          </ActionIcon>
        </Group>
        <Group
          align='center'
          gap='xs'
        >
          <Avatar
            size={48}
            radius='lg'
            name={prospectName}
            color='initials'
          >
            <IconUser
              stroke={1.8}
              size={24}
            />
          </Avatar>
          <Text size='md'>{prospectName}</Text>
        </Group>
      </Stack>
      <ShowingMenu
        ref={showingMenuRef}
        showingId={showingId}
      />
    </Card>
  );
};
