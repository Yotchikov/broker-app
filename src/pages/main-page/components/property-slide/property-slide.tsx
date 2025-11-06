import { Stack } from '@mantine/core';
import type { FC } from 'react';
import type { Property } from '../../../../data';
import { Carousel } from '@mantine/carousel';
import { PropertyInfo } from './property-info';
import { PropertyLinks } from './property-links';
import { PropertyNote } from './property-note';

type PropertySlideProps = {
  property: Property;
};

export const PropertySlide: FC<PropertySlideProps> = (props) => {
  const { property } = props;
  const { id, links } = property;

  const hasInfo = property.price || property.area || property.floor;
  const hasLinks = links && Object.keys(links).length > 0;

  if (!hasInfo && !hasLinks) {
    return null;
  }

  return (
    <Carousel.Slide>
      <Stack gap='xs'>
        <PropertyInfo property={property} />
        <PropertyLinks links={links} />
        <PropertyNote propertyId={id} />
      </Stack>
    </Carousel.Slide>
  );
};
