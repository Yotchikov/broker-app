import { Carousel } from '@mantine/carousel';
import { OwnerInfo } from './owner-info';
import { type Owner } from '../../../../data';
import { type FC } from 'react';
import { OwnerNote } from './owner-note';
import { Stack } from '@mantine/core';

type OwnerSlideProps = {
  owner: Owner | null;
};

export const OwnerSlide: FC<OwnerSlideProps> = (props) => {
  const { owner } = props;

  return (
    <Carousel.Slide>
      <Stack gap='xs'>
        <OwnerInfo owner={owner} />
        <OwnerNote ownerId={owner?.id || ''} />
      </Stack>
    </Carousel.Slide>
  );
};
