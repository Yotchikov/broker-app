import { Box, Button, Card, Group, Stack, Text, useMantineColorScheme } from '@mantine/core';
import { useState, type FC } from 'react';
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  reactify,
} from '../../../../app/utils/ymaps';
import type { YMapLocationRequest } from 'ymaps3';
import { IconMap, IconMapPinFilled, IconPencil } from '@tabler/icons-react';
import { PROPERTY_MAP_LIGHT_CUSTOMIZATION, PROPERTY_MAP_DARK_CUSTOMIZATION } from './property-map-customization';
import type { Property, PropertyLocation } from '../../../../data';
import { PropertyMapEdit } from './property-map-edit';

const DEFAULT_LOCATION: PropertyLocation = {
  lat: 55.733842,
  lng: 37.588144,
};

type PropertyMapProps = {
  property: Property;
};

export const PropertyMap: FC<PropertyMapProps> = (props) => {
  const { property } = props;
  const { colorScheme } = useMantineColorScheme();
  const isLight = colorScheme === 'light';
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<PropertyLocation>(property.location ?? DEFAULT_LOCATION);

  const mapLocation: YMapLocationRequest = {
    center: [currentLocation.lng, currentLocation.lat],
    zoom: 15,
  };

  const handleSave = (newLocation: PropertyLocation) => {
    setCurrentLocation(newLocation);
  };

  return (
    <Stack
      gap='xs'
      data-no-embla-drag
    >
      <Stack gap='4'>
        <Group
          ml='md'
          gap='xs'
          c='dimmed'
        >
          <IconMap
            size={20}
            stroke={1.8}
          />
          <Text size='md'>Объект на карте</Text>
        </Group>
        <Card
          radius='lg'
          p={0}
          style={{ overflow: 'hidden' }}
        >
          <Box
            h={300}
            pos='relative'
          >
            <YMap
              key={`${currentLocation.lng}-${currentLocation.lat}`}
              location={reactify.useDefault(mapLocation)}
            >
              <YMapDefaultSchemeLayer
                customization={isLight ? PROPERTY_MAP_LIGHT_CUSTOMIZATION : PROPERTY_MAP_DARK_CUSTOMIZATION}
              />
              <YMapDefaultFeaturesLayer />

              <YMapMarker
                key={`${currentLocation.lng}-${currentLocation.lat}`}
                coordinates={reactify.useDefault([currentLocation.lng, currentLocation.lat])}
              >
                <IconMapPinFilled
                  size={32}
                  color='var(--mantine-primary-color-filled)'
                  style={{
                    display: 'block',
                    transform: 'translate(-50%, -100%)',
                  }}
                />
              </YMapMarker>
            </YMap>
          </Box>
        </Card>
      </Stack>
      <Button
        variant='light'
        size='md'
        radius='lg'
        fullWidth
        leftSection={<IconPencil size={18} />}
        onClick={() => setIsEditOpen(true)}
      >
        Изменить
      </Button>
      {isEditOpen && (
        <PropertyMapEdit
          propertyId={property.id}
          initialLocation={currentLocation}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSave}
        />
      )}
    </Stack>
  );
};
