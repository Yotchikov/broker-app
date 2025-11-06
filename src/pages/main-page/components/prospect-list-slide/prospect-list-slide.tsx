import { Carousel } from '@mantine/carousel';
import { ProspectList } from './prospect-list';
import { type Prospect } from '../../../../data';
import { type FC } from 'react';

type ProspectListSlideProps = {
  prospects: Prospect[];
};

export const ProspectListSlide: FC<ProspectListSlideProps> = (props) => {
  const { prospects } = props;

  return (
    <Carousel.Slide>
      <ProspectList prospects={prospects} />
    </Carousel.Slide>
  );
};
