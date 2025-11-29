import { Card, Grid, Group, Text } from '@mantine/core';
import type { FC } from 'react';
import type { Property } from '../../../../data';
import { IconBuilding, IconCurrencyDollar, IconShape } from '@tabler/icons-react';
import { Price } from '../../../../app/components';

type PropertyInfoProps = {
  property: Property;
};

export const PropertyInfo: FC<PropertyInfoProps> = (props) => {
  const { area, floor, price } = props.property;

  if (!price && !area && !floor) {
    return null;
  }

  return (
    <Card
      radius='lg'
      px='md'
      py='xs'
    >
      <Grid
        align='center'
        gutter='xs'
      >
        {price && (
          <>
            <Grid.Col span={5}>
              <Group gap='xs'>
                <IconCurrencyDollar
                  color='var(--mantine-color-dimmed)'
                  stroke={1.8}
                  size={20}
                />
                <Text
                  c='dimmed'
                  size='md'
                >
                  Цена
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={7}>
              <Text size='md'>
                <Price
                  amount={price.amount}
                  currency={price.currency}
                />
              </Text>
            </Grid.Col>
          </>
        )}
        {area && (
          <>
            <Grid.Col span={5}>
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
            <Grid.Col span={7}>
              <Text size='md'>{area / 100} м²</Text>
            </Grid.Col>
          </>
        )}
        {floor && (
          <>
            <Grid.Col span={5}>
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
            <Grid.Col span={7}>
              <Text size='md'>
                {floor.number} из {floor.total}
              </Text>
            </Grid.Col>
          </>
        )}
      </Grid>
    </Card>
  );
};
