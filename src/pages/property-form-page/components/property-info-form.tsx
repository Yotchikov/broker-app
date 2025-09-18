import { usePropertyForm } from '../context';
import { Button, Group, NumberInput, SegmentedControl, Stack, TextInput, Title, Notification } from '@mantine/core';

export const PropertyInfoForm = () => {
  const { formData, updatePropertyInfo, nextStep, isLoading: loading, error, setError } = usePropertyForm();

  const dealTypes = [
    { value: 'sale', label: 'Продажа' },
    { value: 'rent', label: 'Аренда' },
  ];

  return (
    <Stack gap='md'>
      <Title order={4}>Объект</Title>
      <TextInput
        label='Название'
        placeholder='ЖК Lucky'
        required
        value={formData.property.name}
        onChange={(ev) => updatePropertyInfo({ name: ev.currentTarget.value })}
      />

      <SegmentedControl
        fullWidth
        data={dealTypes}
        value={formData.property.dealType}
        onChange={(v) => updatePropertyInfo({ dealType: (v as 'sale' | 'rent') ?? 'sale' })}
      />

      <NumberInput
        label='Цена'
        placeholder={formData.property.dealType === 'sale' ? '15,000,000' : '80,000'}
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
        thousandSeparator
      />

      <Group wrap='nowrap'>
        <NumberInput
          label='Этаж'
          placeholder='7'
          value={formData.property.floor?.number}
          onChange={(v) => {
            if (Number.isFinite(v as number)) {
              updatePropertyInfo({
                floor: { number: v as number, total: formData.property.floor?.total ?? 0 },
              });
            }
          }}
          min={0}
        />
        <NumberInput
          label='Всего этажей'
          placeholder='19'
          value={formData.property.floor?.total}
          onChange={(v) => {
            if (Number.isFinite(v as number)) {
              updatePropertyInfo({ floor: { number: formData.property.floor?.number ?? 0, total: v as number } });
            }
          }}
          min={0}
        />
      </Group>

      <NumberInput
        label='Площадь'
        placeholder='69'
        value={formData.property.area}
        onChange={(v) => {
          if (Number.isFinite(v as number)) {
            updatePropertyInfo({ area: v as number });
          }
        }}
        min={0}
        rightSection='м²'
        thousandSeparator
      />

      {error && (
        <Notification
          color='red'
          title='Ошибка'
          radius={'md'}
          onClose={() => setError(null)}
        >
          {error}
        </Notification>
      )}

      <Group justify='flex-end'>
        <Button
          onClick={nextStep}
          disabled={loading}
        >
          Далее
        </Button>
      </Group>
    </Stack>
  );
};
