import { usePropertyForm } from '../context';
import { Group, NumberInput, SegmentedControl, Stack, TextInput, Title, Notification } from '@mantine/core';
import IconBrandCian from 'public/icons/companies/cian.svg?react';
import IconBrandAvito from 'public/icons/companies/avito.svg?react';
import IconBrandYandex from 'public/icons/companies/yandex.svg?react';
import IconBrandDomclick from 'public/icons/companies/domclick.svg?react';
import { ClearButton } from './clear-button';
import { IconExclamationMark } from '@tabler/icons-react';

type PropertyInfoFormProps = {
  withTitle?: boolean;
};

export const PropertyInfoForm = (props: PropertyInfoFormProps) => {
  const { withTitle = true } = props;

  const { formData, updatePropertyInfo, error, setError } = usePropertyForm();

  const dealTypes = [
    { value: 'sale', label: 'Продажа' },
    { value: 'rent', label: 'Аренда' },
  ];

  return (
    <Stack gap='md'>
      {withTitle && <Title order={3}>Объект</Title>}
      <TextInput
        label='Название'
        radius='lg'
        size='md'
        placeholder='ЖК Lucky'
        required
        value={formData.property.name}
        onChange={(ev) => updatePropertyInfo({ name: ev.currentTarget.value })}
        rightSection={formData.property.name ? <ClearButton onClick={() => updatePropertyInfo({ name: '' })} /> : null}
      />
      <SegmentedControl
        size='lg'
        fullWidth
        data={dealTypes}
        value={formData.property.dealType}
        onChange={(v) => updatePropertyInfo({ dealType: (v as 'sale' | 'rent') ?? 'sale' })}
        radius='lg'
        styles={{
          root: {
            backgroundColor: 'transparent',
          },
        }}
      />
      <NumberInput
        label='Цена'
        size='md'
        radius='lg'
        thousandSeparator=' '
        placeholder={formData.property.dealType === 'sale' ? '15 000 000' : '80 000'}
        value={formData.property.price?.amount}
        onChange={(v) => {
          if ((v as number) > 0 && Number.isFinite(v as number)) {
            updatePropertyInfo({
              price: {
                // TODO: add currency
                currency: 'RUB',
                amount: v as number,
              },
            });
          } else {
            updatePropertyInfo({
              price: undefined,
            });
          }
        }}
        min={0}
        rightSection='₽'
      />
      <Group wrap='nowrap'>
        <NumberInput
          label='Этаж'
          size='md'
          radius='lg'
          placeholder='7'
          value={formData.property.floor?.number}
          onChange={(v) => {
            updatePropertyInfo({
              floor: { number: (v as number) || undefined, total: formData.property.floor?.total },
            });
          }}
          min={0}
        />
        <NumberInput
          label='Всего этажей'
          size='md'
          radius='lg'
          placeholder='19'
          value={formData.property.floor?.total}
          onChange={(v) => {
            updatePropertyInfo({
              floor: { number: formData.property.floor?.number, total: (v as number) || undefined },
            });
          }}
          min={0}
        />
      </Group>
      <NumberInput
        label='Площадь'
        size='md'
        radius='lg'
        placeholder='69'
        value={formData.property.area}
        onChange={(v) => {
          updatePropertyInfo({ area: (v as number) || undefined });
        }}
        min={0}
        thousandSeparator=' '
        rightSection='м²'
      />
      <Title order={4}>Ссылки</Title>
      <TextInput
        leftSection={
          <IconBrandCian
            width={16}
            height={16}
          />
        }
        label='Циан'
        radius='lg'
        size='md'
        placeholder='https://www.cian.ru/'
        value={formData.property.links?.cian || ''}
        onChange={(ev) =>
          updatePropertyInfo({ links: { ...formData.property.links, cian: ev.currentTarget.value || undefined } })
        }
        rightSection={
          formData.property.links?.cian ? (
            <ClearButton
              onClick={() => updatePropertyInfo({ links: { ...formData.property.links, cian: undefined } })}
            />
          ) : null
        }
      />
      <TextInput
        leftSection={
          <IconBrandAvito
            width={16}
            height={16}
          />
        }
        label='Авито'
        radius='lg'
        size='md'
        placeholder='https://www.avito.ru/'
        value={formData.property.links?.avito || ''}
        onChange={(ev) =>
          updatePropertyInfo({ links: { ...formData.property.links, avito: ev.currentTarget.value || undefined } })
        }
        rightSection={
          formData.property.links?.avito ? (
            <ClearButton
              onClick={() => updatePropertyInfo({ links: { ...formData.property.links, avito: undefined } })}
            />
          ) : null
        }
      />
      <TextInput
        leftSection={
          <IconBrandYandex
            width={16}
            height={16}
          />
        }
        label='Яндекс'
        radius='lg'
        size='md'
        placeholder='https://realty.yandex.ru/'
        value={formData.property.links?.yandex || ''}
        onChange={(ev) =>
          updatePropertyInfo({ links: { ...formData.property.links, yandex: ev.currentTarget.value || undefined } })
        }
        rightSection={
          formData.property.links?.yandex ? (
            <ClearButton
              onClick={() => updatePropertyInfo({ links: { ...formData.property.links, yandex: undefined } })}
            />
          ) : null
        }
      />
      <TextInput
        leftSection={
          <IconBrandDomclick
            width={16}
            height={16}
          />
        }
        label='Домклик'
        radius='lg'
        size='md'
        placeholder='https://www.domclick.ru/'
        value={formData.property.links?.domclick || ''}
        onChange={(ev) =>
          updatePropertyInfo({ links: { ...formData.property.links, domclick: ev.currentTarget.value || undefined } })
        }
        rightSection={
          formData.property.links?.domclick ? (
            <ClearButton
              onClick={() => updatePropertyInfo({ links: { ...formData.property.links, domclick: undefined } })}
            />
          ) : null
        }
      />
      {error && (
        <Notification
          color='red'
          icon={<IconExclamationMark size={16} />}
          radius={'lg'}
          onClose={() => setError(null)}
          pos='absolute'
          bottom={76 * 2}
          left={16}
          right={16}
          style={{ zIndex: 150 }}
          bg='red.1'
        >
          {error}
        </Notification>
      )}
    </Stack>
  );
};
