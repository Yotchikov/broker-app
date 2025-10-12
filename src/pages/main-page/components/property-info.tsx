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
              <IconShape
                color='var(--mantine-color-dimmed)'
                stroke={1.8}
                size={20}
              />
              <Text
                c='dimmed'
                size='md'
              >
                Площадь
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text size='md'>{area / 100} м²</Text>
          </Grid.Col>
        </>
      )}
      {floor && (
        <>
          <Grid.Col span={4}>
            <Group gap='xs'>
              <IconBuilding
                color='var(--mantine-color-dimmed)'
                stroke={1.8}
                size={20}
              />
              <Text
                c='dimmed'
                size='md'
              >
                Этаж
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text size='md'>
              {floor.number} из {floor.total}
            </Text>
          </Grid.Col>
        </>
      )}
    </Grid>
  );
};
