import { ActionIcon, Box, Button, Portal } from '@mantine/core';
import { useState, useCallback, type FC } from 'react';
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapListener,
  reactify,
} from '../../../../app/utils/ymaps';
import type { YMapLocationRequest } from 'ymaps3';
import { IconMapPinFilled, IconX } from '@tabler/icons-react';
import { useMantineColorScheme } from '@mantine/core';
import { PROPERTY_MAP_LIGHT_CUSTOMIZATION, PROPERTY_MAP_DARK_CUSTOMIZATION } from './property-map-customization';
import type { PropertyLocation } from '../../../../data';
import { propertyDataProvider } from '../../../../data';

type PropertyMapEditProps = {
  propertyId: string;
  initialLocation?: PropertyLocation;
  onClose: () => void;
  onSave?: (location: PropertyLocation) => void;
};

const DEFAULT_LOCATION: PropertyLocation = {
  lat: 55.733842,
  lng: 37.588144,
};

export const PropertyMapEdit: FC<PropertyMapEditProps> = (props) => {
  const { propertyId, initialLocation, onClose, onSave } = props;
  const { colorScheme } = useMantineColorScheme();
  const isLight = colorScheme === 'light';

  const startLocation = initialLocation ?? DEFAULT_LOCATION;
  const [currentCenter, setCurrentCenter] = useState<PropertyLocation>(startLocation);
  const [hasChanged, setHasChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const mapLocation: YMapLocationRequest = {
    center: [startLocation.lng, startLocation.lat],
    zoom: 15,
  };

  const handleMapUpdate = useCallback(
    (event: { location: { center: readonly [number, number, number?] } }) => {
      const [lng, lat] = event.location.center;
      setCurrentCenter({ lng, lat });

      // Check if location changed from initial
      if (lng !== startLocation.lng || lat !== startLocation.lat) {
        setHasChanged(true);
      }
    },
    [startLocation.lng, startLocation.lat],
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await propertyDataProvider.updateProperty({
        id: propertyId,
        location: currentCenter,
      });
      onSave?.(currentCenter);
      onClose();
    } catch (error) {
      console.error('Failed to save location:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Portal>
      <Box
        pos='fixed'
        top={0}
        left={0}
        right={0}
        bottom={0}
        style={{ zIndex: 1000 }}
      >
        <YMap location={reactify.useDefault(mapLocation)}>
          <YMapDefaultSchemeLayer
            customization={isLight ? PROPERTY_MAP_LIGHT_CUSTOMIZATION : PROPERTY_MAP_DARK_CUSTOMIZATION}
          />
          <YMapDefaultFeaturesLayer />
          <YMapListener onUpdate={handleMapUpdate} />
        </YMap>

        {/* Fixed center marker - positioned so the pin tip points to exact center */}
        <IconMapPinFilled
          size={40}
          color='var(--mantine-primary-color-filled)'
          style={{
            position: 'absolute',
            top: 'calc(50% - 40px)', // Move up by icon height so bottom is at center
            left: 'calc(50% - 20px)', // Move left by half icon width to center horizontally
            zIndex: 1001,
            pointerEvents: 'none',
            display: 'block',
          }}
        />

        <ActionIcon
          pos='absolute'
          top={8}
          right={8}
          size='xl'
          variant='transparent'
          color='default'
          onClick={onClose}
          style={{ zIndex: 1001 }}
        >
          <IconX size={24} />
        </ActionIcon>

        {hasChanged && (
          <Button
            pos='absolute'
            bottom={32}
            left='50%'
            style={{ transform: 'translateX(-50%)', zIndex: 1001 }}
            size='md'
            radius='lg'
            onClick={handleSave}
            loading={isSaving}
          >
            Сохранить
          </Button>
        )}
      </Box>
    </Portal>
  );
};
