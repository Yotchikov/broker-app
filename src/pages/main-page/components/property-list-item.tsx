import { useEffect, useState, type FC } from 'react';
import type { Property } from '../../../data/entities/property';
import { Accordion, Group, Avatar, Stack, Text } from '@mantine/core';
import { IconBuilding } from '@tabler/icons-react';
import { OwnerInfo } from './owner-info';
import { PropertyInfo } from './property-info';
import { PropertyListItemMenu } from './property-list-item-menu';
import { PropertyFormProvider } from '../../property-form-page/context';
import { ownerDataProvider, prospectDataProvider, type Owner, type Prospect } from '../../../data';
import { Carousel } from '@mantine/carousel';
import { ProspectList } from './prospect-list';
import { PropertyNote } from './property-note';

type PropertyListItemProps = {
  property: Property;
};

export const PropertyListItem: FC<PropertyListItemProps> = (props) => {
  const { property } = props;

  const [owner, setOwner] = useState<Owner | null>(null);
  const [prospects, setProspects] = useState<Prospect[]>([]);

  useEffect(() => {
    if (property.ownerId) {
      ownerDataProvider.getOwnerById(property.ownerId).then(setOwner);
    }
    Promise.all(property.prospectIds.map((prospectId) => prospectDataProvider.getProspectById(prospectId))).then(
      setProspects,
    );
  }, [property]);

  return (
    <PropertyFormProvider propertyId={property.id}>
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
                radius='lg'
                name={property.name}
                color='initials'
              >
                <IconBuilding
                  stroke={1.8}
                  size={24}
                />
              </Avatar>
              <Stack gap={0}>
                <Text
                  size='sm'
                  c='dimmed'
                >
                  {property.dealType === 'sale' ? 'Продажа' : 'Аренда'}
                </Text>
                <Text
                  fw='bold'
                  size='lg'
                >
                  {property.name}
                </Text>
              </Stack>
            </Group>
          </Accordion.Control>
          <PropertyListItemMenu propertyId={property.id} />
        </Group>
        <Accordion.Panel>
          <Carousel
            slideSize='90%'
            withControls={false}
            slideGap={'xs'}
            emblaOptions={{ loop: true }}
          >
            <Carousel.Slide>
              <PropertyInfo property={property} />
            </Carousel.Slide>
            <Carousel.Slide>
              <OwnerInfo owner={owner} />
            </Carousel.Slide>
            <Carousel.Slide>
              <ProspectList
                prospects={prospects}
                propertyId={property.id}
              />
            </Carousel.Slide>
            <Carousel.Slide>
              <PropertyNote propertyId={property.id} />
            </Carousel.Slide>
          </Carousel>
          {/* <PropertyInfo
            price={property.price}
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
                    <Group
                      align='center'
                      gap='xs'
                    >
                      <Avatar
                        size={48}
                        radius='lg'
                        name={owner?.name}
                        color='initials'
                      >
                        <IconUser
                          stroke={1.8}
                          size={24}
                        />
                      </Avatar>
                      <Stack gap={0}>
                        <Text
                          fw='bold'
                          size='lg'
                        >
                          {owner?.name}
                        </Text>
                        <Text
                          size='sm'
                          c='dimmed'
                        >
                          Собственник
                        </Text>
                      </Stack>
                    </Group>
                  </Accordion.Control>
                  <OwnerInfoMenu />
                </Group>
                <Accordion.Panel>
                  <OwnerInfo owner={owner} />
                </Accordion.Panel>
              </Accordion.Item>
            )}
            <Divider ml={106} />
            <Accordion.Item value='prospects'>
              <Group
                gap={0}
                wrap='nowrap'
              >
                <Accordion.Control>
                  <Group
                    align='center'
                    gap='xs'
                  >
                    <Avatar
                      size={48}
                      radius='lg'
                      color='initials'
                      name={`Клиенты ${property.name}`}
                    >
                      <IconUsers
                        stroke={1.8}
                        size={24}
                      />
                    </Avatar>
                    <Stack gap={0}>
                      <Text
                        fw='bold'
                        size='lg'
                      >
                        {property.prospectIds.length} клиентов
                      </Text>
                    </Stack>
                  </Group>
                </Accordion.Control>
                <ProspectListMenu />
              </Group>
              <Accordion.Panel styles={{ content: { paddingRight: '0' } }}>
                <ProspectList
                  prospects={prospects}
                  propertyId={property.id}
                />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion> */}
        </Accordion.Panel>
      </Accordion.Item>
    </PropertyFormProvider>
  );
};
