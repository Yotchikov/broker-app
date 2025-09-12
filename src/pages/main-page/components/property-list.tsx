import { Accordion, Avatar, Button, Grid, Group, NumberFormatter, Stack, Text } from '@mantine/core';
import type { Property } from '../../../data/entities/property';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useLoaderData } from 'react-router';
import { OwnerInformation } from './owner-information';
import { ProspectList } from './prospect-list';

export const PropertyList = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();

  return (
    <Accordion>
      {properties.map((property) => (
        <Accordion.Item
          value={property.id}
          key={property.id}
        >
          <Accordion.Control>
            <Group
              align='flex-start'
              gap='xs'
            >
              <Avatar
                radius='xl'
                name={property.name}
                color='initials'
              />
              <Stack gap={0}>
                {property.name}
                {property.price && (
                  <Text size='xs'>
                    <NumberFormatter
                      value={property.price.amount / 100}
                      suffix={property.price.currency}
                      thousandSeparator
                    />
                  </Text>
                )}
              </Stack>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack gap='xs'>
              <OwnerInformation ownerId={property.ownerId} />
              <ProspectList prospectIds={property.prospectIds} />

              <Grid>
                <Grid.Col span={6}>
                  <Button
                    variant='light'
                    color='blue'
                    leftSection={<IconPencil size={16} />}
                    fullWidth
                  >
                    Редактировать
                  </Button>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Button
                    variant='light'
                    color='red'
                    leftSection={<IconTrash size={16} />}
                    fullWidth
                  >
                    Удалить
                  </Button>
                </Grid.Col>
              </Grid>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
