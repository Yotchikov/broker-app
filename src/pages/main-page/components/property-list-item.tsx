import { useEffect, useState, type FC } from 'react';
import type { Property } from '../../../data/entities/property';
import { Accordion, Group, Avatar, Stack, Text } from '@mantine/core';
import { IconBuilding } from '@tabler/icons-react';
import { PropertySlide } from './property-slide';
import { PropertyListItemMenu } from './property-list-item-menu';
import { PropertyFormProvider } from '../../property-form-page/context';
import { ownerDataProvider, prospectDataProvider, type Owner, type Prospect } from '../../../data';
import { Carousel } from '@mantine/carousel';
import { ProspectListSlide } from './prospect-list-slide';
import { OwnerSlide } from './owner-slide';

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
            <PropertySlide property={property} />
            <OwnerSlide owner={owner} />
            <ProspectListSlide prospects={prospects} />
          </Carousel>
        </Accordion.Panel>
      </Accordion.Item>
    </PropertyFormProvider>
  );
};
