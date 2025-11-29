import { Stack } from '@mantine/core';
import type { FC } from 'react';
import type { Property } from '../../../../data';
import { Carousel } from '@mantine/carousel';
import { PropertyInfo } from './property-info';
import { PropertyLinks } from './property-links';
import { PropertyNote } from './property-note';
import { PropertyActions } from './property-actions';

type PropertySlideProps = {
  property: Property;
};

export const PropertySlide: FC<PropertySlideProps> = (props) => {
  const { property } = props;
  const { id, links } = property;

  return (
    <Carousel.Slide>
      <Stack gap='xs'>
        <PropertyActions propertyId={id} />
        <PropertyInfo property={property} />
        <PropertyLinks links={links} />
        <PropertyNote propertyId={id} />
      </Stack>
    </Carousel.Slide>
  );
};
