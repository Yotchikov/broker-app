import { Accordion, ActionIcon, Avatar, Group, Menu, Space, Stack, Text } from '@mantine/core';
import type { Property } from '../../../data/entities/property';
import { IconDots, IconPencil, IconPlus, IconTrash, IconUser, IconUsers } from '@tabler/icons-react';
import { useLoaderData, useNavigate } from 'react-router';
import { OwnerInfo } from './owner-info';
import { ProspectList } from './prospect-list';
import { Price } from '../../../app/components';
import styles from '../main-page.module.css';
import { PropertyInfo } from './property-info';

export const PropertyList = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();
  const navigate = useNavigate();

  return (
    <Accordion
      chevronPosition='left'
      classNames={{ chevron: styles.chevron }}
    >
      {properties.map((property) => (
        <Accordion.Item
          value={property.id}
          key={property.id}
        >
          <Group
            gap={0}
            wrap='nowrap'
            pr={'md'}
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
                    <Text
                      size='xs'
                      c='dimmed'
                    >
                      <Price
                        amount={property.price.amount}
                        currency={property.price.currency}
                      />
                    </Text>
                  )}
                </Stack>
              </Group>
            </Accordion.Control>
            <Menu position='bottom-end'>
              <Menu.Target>
                <ActionIcon
                  variant='subtle'
                  color='black'
                >
                  <IconDots size={16} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconPencil size={16} />}
                  onClick={() => {
                    navigate(`/properties/${property.id}/edit`);
                  }}
                >
                  Редактировать
                </Menu.Item>
                <Menu.Item
                  color='red'
                  leftSection={<IconTrash size={16} />}
                  onClick={() => {
                    // TODO: delete property
                  }}
                >
                  Удалить
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Accordion.Panel>
            <PropertyInfo
              area={property.area}
              floor={property.floor}
            />
            <Space h='md' />
            <Accordion
              multiple
              chevronPosition='left'
              variant='unstyled'
              classNames={{ chevron: styles.chevron }}
            >
              {property.ownerId && (
                <Accordion.Item value='owner'>
                  <Accordion.Control>
                    <Group gap='xs'>
                      <IconUser size={16} />
                      Собственник
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <OwnerInfo ownerId={property.ownerId} />
                  </Accordion.Panel>
                </Accordion.Item>
              )}
              {property.prospectIds.length > 0 && (
                <Accordion.Item value='prospects'>
                  <Group
                    gap={0}
                    wrap='nowrap'
                  >
                    <Accordion.Control>
                      <Group gap='xs'>
                        <IconUsers size={16} />
                        Клиенты
                      </Group>
                    </Accordion.Control>
                    <ActionIcon
                      variant='subtle'
                      color='black'
                    >
                      <IconPlus size={16} />
                    </ActionIcon>
                  </Group>
                  <Accordion.Panel>
                    <ProspectList prospectIds={property.prospectIds} />
                  </Accordion.Panel>
                </Accordion.Item>
              )}
            </Accordion>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
