import { Grid, Group, Text } from '@mantine/core';
import type { FC } from 'react';
import type { Property } from '../../../data';
import { IconBuilding, IconShape } from '@tabler/icons-react';

type PropertyInfoProps = Pick<Property, 'area' | 'floor'>;

export const PropertyInfo: FC<PropertyInfoProps> = (props) => {
  const { area, floor } = props;

  return (
    <Grid pl={16}>
      {area && (
        <>
          <Grid.Col span={4}>
            <Group gap='xs'>
              <IconShape size={16} />
              <Text size='sm'>Площадь</Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text size='sm'>{area / 100} м²</Text>
          </Grid.Col>
        </>
      )}
      {floor && (
        <>
          <Grid.Col span={4}>
            <Group gap='xs'>
              <IconBuilding size={16} />
              <Text size='sm'>Этаж</Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text size='sm'>
              {floor.number} из {floor.total}
            </Text>
          </Grid.Col>
        </>
      )}
    </Grid>
  );
};
