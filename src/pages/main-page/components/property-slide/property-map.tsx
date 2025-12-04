import { Box, Card, Group, Stack, Text, useMantineColorScheme } from '@mantine/core';
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  reactify,
} from '../../../../app/utils/ymaps';
import type { YMapLocationRequest } from 'ymaps3';
import { IconMap, IconMapPinFilled } from '@tabler/icons-react';
import { PROPERTY_MAP_LIGHT_CUSTOMIZATION, PROPERTY_MAP_DARK_CUSTOMIZATION } from './property-map-customization';

const LOCATION: YMapLocationRequest = {
  center: [37.588144, 55.733842],
  zoom: 15,
};

export const PropertyMap = () => {
  const { colorScheme } = useMantineColorScheme();
  const isLight = colorScheme === 'light';

  return (
    <Stack
      gap='4'
      data-no-embla-drag
    >
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
      >
        <Box h={300}>
          <YMap location={reactify.useDefault(LOCATION)}>
            <YMapDefaultSchemeLayer
              customization={(isLight ? PROPERTY_MAP_LIGHT_CUSTOMIZATION : PROPERTY_MAP_DARK_CUSTOMIZATION) as any}
            />
            <YMapDefaultFeaturesLayer />

            <YMapMarker coordinates={reactify.useDefault([37.588144, 55.733842])}>
              <IconMapPinFilled
                size={32}
                color='var(--mantine-primary-color-filled)'
              />
            </YMapMarker>
          </YMap>
        </Box>
      </Card>
    </Stack>
  );
};
