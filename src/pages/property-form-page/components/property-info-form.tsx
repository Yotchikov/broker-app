import { usePropertyForm } from '../context';
import { Group, NumberInput, SegmentedControl, Stack, TextInput, Title, Notification } from '@mantine/core';

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
        radius='xl'
        size='md'
        placeholder='ЖК Lucky'
        required
        value={formData.property.name}
        onChange={(ev) => updatePropertyInfo({ name: ev.currentTarget.value })}
      />

      <SegmentedControl
        size='md'
        fullWidth
        data={dealTypes}
        value={formData.property.dealType}
        onChange={(v) => updatePropertyInfo({ dealType: (v as 'sale' | 'rent') ?? 'sale' })}
        radius='xl'
        styles={{
          root: {
            backgroundColor: 'transparent',
          },
        }}
      />

      <NumberInput
        label='Цена'
        size='md'
        radius='xl'
        thousandSeparator=' '
        placeholder={formData.property.dealType === 'sale' ? '15 000 000' : '80 000'}
        value={formData.property.price?.amount}
        onChange={(v) => {
          if (Number.isFinite(v as number)) {
            updatePropertyInfo({
              price: {
                // TODO: add currency
                currency: 'RUB',
                amount: v as number,
              },
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
          radius='xl'
          placeholder='7'
          value={formData.property.floor?.number}
          onChange={(v) => {
            if (Number.isFinite(v as number)) {
              updatePropertyInfo({
                floor: { number: v as number, total: formData.property.floor?.total },
              });
            } else {
              updatePropertyInfo({
                floor: { number: undefined, total: formData.property.floor?.total },
              });
            }
          }}
          min={0}
        />
        <NumberInput
          label='Всего этажей'
          size='md'
          radius='xl'
          placeholder='19'
          value={formData.property.floor?.total}
          onChange={(v) => {
            if (Number.isFinite(v as number)) {
              updatePropertyInfo({
                floor: { number: formData.property.floor?.number, total: v as number },
              });
            } else {
              updatePropertyInfo({
                floor: { number: formData.property.floor?.number, total: undefined },
              });
            }
          }}
          min={0}
        />
      </Group>

      <NumberInput
        label='Площадь'
        size='md'
        radius='xl'
        placeholder='69'
        value={formData.property.area}
        onChange={(v) => {
          if (Number.isFinite(v as number)) {
            updatePropertyInfo({ area: v as number });
          }
        }}
        min={0}
        thousandSeparator=' '
        rightSection='м²'
      />

      {error && (
        <Notification
          color='red'
          title='Ошибка'
          radius={'md'}
          onClose={() => setError(null)}
          pos='absolute'
          bottom={76 * 2}
          left={16}
          right={16}
          style={{ zIndex: 150 }}
        >
          {error}
        </Notification>
      )}
    </Stack>
  );
};
