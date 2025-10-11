import { type FC } from 'react';
import type { Property } from '../../../data/entities/property';
import { Accordion, Group, Avatar, Stack, Space, Text, Divider } from '@mantine/core';
import { IconUser, IconUsers } from '@tabler/icons-react';
import { Price } from '../../../app/components';
import { OwnerInfo } from './owner-info';
import { PropertyInfo } from './property-info';
import { ProspectList } from './prospect-list';
import styles from '../main-page.module.css';
import { PropertyListItemMenu } from './property-list-item-menu';
import { OwnerInfoMenu } from './owner-info-menu';
import { ProspectListMenu } from './prospect-list-menu';
import { PropertyFormProvider } from '../../property-form-page/context';

type PropertyListItemProps = {
  property: Property;
};

export const PropertyListItem: FC<PropertyListItemProps> = (props) => {
  const { property } = props;

  return (
    <>
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
              align='center'
              gap='xs'
            >
              <Avatar
                size={48}
                radius='xl'
                name={property.name}
                color='initials'
              />
              <Stack gap={0}>
                <Text
                  fw='bold'
                  size='lg'
                >
                  {property.name}
                </Text>
                {property.price && (
                  <Text
                    size='sm'
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
          <PropertyFormProvider propertyId={property.id}>
            <PropertyListItemMenu propertyId={property.id} />
          </PropertyFormProvider>
        </Group>
        <Accordion.Panel>
          <PropertyInfo
            area={property.area}
            floor={property.floor}
          />
          <Space h='xs' />
          <Accordion
            multiple
            chevronPosition='left'
            variant='unstyled'
            classNames={{ chevron: styles.chevron }}
          >
            {property.ownerId && (
              <Accordion.Item value='owner'>
                <Group
                  gap={0}
                  wrap='nowrap'
                >
                  <Accordion.Control>
                    <Group gap='xs'>
                      <IconUser
                        stroke={1.8}
                        color='var(--mantine-color-dimmed)'
                        size={24}
                      />
                      <Text size='lg'>Собственник</Text>
                    </Group>
                  </Accordion.Control>
                  <OwnerInfoMenu propertyId={property.id} />
                </Group>
                <Accordion.Panel>
                  <OwnerInfo ownerId={property.ownerId} />
                </Accordion.Panel>
              </Accordion.Item>
            )}
            <Divider ml={82} />
            <Accordion.Item value='prospects'>
              <Group
                gap={0}
                wrap='nowrap'
              >
                <Accordion.Control>
                  <Group
                    gap='xs'
                    wrap='nowrap'
                  >
                    <IconUsers
                      stroke={1.8}
                      color='var(--mantine-color-dimmed)'
                      size={24}
                    />
                    <Text size='lg'>Клиенты</Text>{' '}
                    <Text
                      size='lg'
                      c='dimmed'
                    >
                      {property.prospectIds.length}
                    </Text>
                  </Group>
                </Accordion.Control>
                <ProspectListMenu propertyId={property.id} />
              </Group>
              <Accordion.Panel>
                <ProspectList
                  prospectIds={property.prospectIds}
                  propertyId={property.id}
                />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Accordion.Panel>
      </Accordion.Item>
    </>
  );
};
