import { usePropertyForm } from '../context';
import { Box, Button, Group, NumberInput, SegmentedControl, Stack, TextInput, Title } from '@mantine/core';

export const PropertyInfoForm = () => {
  const { formData, updatePropertyInfo, nextStep, isLoading: loading, error } = usePropertyForm();

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
        value={formData.name}
        onChange={(ev) => updatePropertyInfo({ name: ev.currentTarget.value })}
      />

      <SegmentedControl
        fullWidth
        data={dealTypes}
        value={formData.dealType}
        onChange={(v) => updatePropertyInfo({ dealType: (v as 'sale' | 'rent') ?? 'sale' })}
      />

      <NumberInput
        label='Цена'
        placeholder={formData.dealType === 'sale' ? '15,000,000' : '80,000'}
        value={formData.amount}
        onChange={(v) => updatePropertyInfo({ amount: Number.isFinite(v as number) ? (v as number) : '' })}
        min={0}
        rightSection='₽'
        thousandSeparator
      />

      <Group wrap='nowrap'>
        <NumberInput
          label='Этаж'
          placeholder='7'
          value={formData.floorNumber}
          onChange={(v) => updatePropertyInfo({ floorNumber: Number.isFinite(v as number) ? (v as number) : '' })}
          min={0}
        />
        <NumberInput
          label='Всего этажей'
          placeholder='19'
          value={formData.floorTotal}
          onChange={(v) => updatePropertyInfo({ floorTotal: Number.isFinite(v as number) ? (v as number) : '' })}
          min={0}
        />
      </Group>

      <NumberInput
        label='Площадь'
        placeholder='69'
        value={formData.area}
        onChange={(v) => updatePropertyInfo({ area: Number.isFinite(v as number) ? (v as number) : '' })}
        min={0}
        rightSection='м²'
        thousandSeparator
      />

      {error && <Box c='red.6'>{error}</Box>}

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
