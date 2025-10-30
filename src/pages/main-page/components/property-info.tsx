import { Card, Grid, Group, Text, Stack } from '@mantine/core';
import type { FC } from 'react';
import type { Property } from '../../../data';
import { IconBuilding, IconCurrencyDollar, IconInfoCircle, IconLink, IconShape } from '@tabler/icons-react';
import { Price } from '../../../app/components';
import { LINK_LABELS } from './consts';

type PropertyInfoProps = {
  property: Property;
};

export const PropertyInfo: FC<PropertyInfoProps> = (props) => {
  const { area, floor, price, links } = props.property;

  return (
    <Stack gap='xs'>
      <Group
        ml='md'
        gap='xs'
        c='dimmed'
      >
        <IconInfoCircle
          size={20}
          stroke={1.8}
        />
        <Text size='md'>Информация</Text>
      </Group>
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
      {links && (
        <>
          <Group
            ml='md'
            gap='xs'
            c='dimmed'
          >
            <IconLink
              size={20}
              stroke={1.8}
            />
            <Text size='md'>Ссылки</Text>
          </Group>
          <Card
            radius='lg'
            px='md'
            py='xs'
          >
            <Stack gap='xs'>
              {Object.entries(links).map(([key, value]) =>
                value ? (
                  <a
                    href={value}
                    target='_blank'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {LINK_LABELS[key as keyof Property['links']]}
                  </a>
                ) : null,
              )}
            </Stack>
          </Card>
        </>
      )}
    </Stack>
  );
};
