import { Accordion, Avatar, Button, Grid, Group, Stack, Text } from '@mantine/core';
import type { Property } from '../../../data/entities/property';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useLoaderData, useNavigate } from 'react-router';
import { OwnerInformation } from './owner-information';
import { ProspectList } from './prospect-list';
import { Price } from '../../../app/components';

export const PropertyList = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();
  const navigate = useNavigate();

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
                    <Price
                      amount={property.price.amount}
                      currency={property.price.currency}
                    />
                  </Text>
                )}
              </Stack>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack gap='xs'>
              {property.ownerId && <OwnerInformation ownerId={property.ownerId} />}
              {property.prospectIds.length > 0 && <ProspectList prospectIds={property.prospectIds} />}
              <Grid>
                <Grid.Col span={6}>
                  <Button
                    variant='light'
                    color='blue'
                    leftSection={<IconPencil size={16} />}
                    fullWidth
                    onClick={() => {
                      navigate(`/properties/${property.id}/edit`);
                    }}
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
                    onClick={() => {
                      // TODO: delete property
                    }}
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
