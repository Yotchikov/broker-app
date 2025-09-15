import type { FC, FormEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Box,
  Button,
  Container,
  Group,
  NumberInput,
  SegmentedControl,
  Stack,
  Stepper,
  TextInput,
  Title,
} from '@mantine/core';
import type { Property } from 'data';
import { propertyDataProvider } from 'data';
import { IconBuilding, IconUser, IconUsers } from '@tabler/icons-react';
import { OwnerInfoForm, PropertyInfoForm } from './components';

type FormState = {
  name: string;
  dealType: 'sale' | 'rent';
  amount: number | '';
  floorNumber: number | '';
  floorTotal: number | '';
  area: number | '';
};

const defaultState: FormState = {
  name: '',
  dealType: 'sale',
  amount: '',
  floorNumber: '',
  floorTotal: '',
  area: '',
};

export const PropertyFormPage: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEditMode = Boolean(params?.id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<FormState>(defaultState);

  // Prefill in edit mode if route has id and provider supports fetching
  useMemo(() => {
    if (!isEditMode || !params?.id) return;
    (async () => {
      try {
        const p = await propertyDataProvider.getPropertyById(params.id as string);
        setState({
          name: p.name ?? '',
          dealType: p.dealType,
          amount: p.price?.amount ?? '',
          floorNumber: p.floor?.number ?? '',
          floorTotal: p.floor?.total ?? '',
          area: p.area ?? '',
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Не удалось загрузить объект');
      }
    })();
  }, [isEditMode, params?.id]);

  const dealTypes = [
    { value: 'sale', label: 'Продажа' },
    { value: 'rent', label: 'Аренда' },
  ];

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
        const newProperty: Property = {
          id: crypto.randomUUID(),
          name: state.name.trim(),
          dealType: state.dealType,
          prospectIds: [],
          price:
            state.amount === ''
              ? undefined
              : {
                  amount: Number(state.amount) * 100,
                  // TODO: add currency
                  currency: 'RUB',
                },
          floor:
            state.floorNumber === '' && state.floorTotal === ''
              ? undefined
              : {
                  number: Number(state.floorNumber || 0),
                  total: Number(state.floorTotal || 0),
                },
          area: state.area === '' ? undefined : Number(state.area),
        };

        // If edit mode, reuse id and prospectIds from existing property
        if (isEditMode && params?.id) {
          const existing = await propertyDataProvider.getPropertyById(params.id);
          newProperty.id = existing.id;
          newProperty.prospectIds = existing.prospectIds;
        }

        // Our provider only exposes createProperty; use it for both create and pseudo-update
        await propertyDataProvider.createProperty(newProperty);
        navigate(`/`);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Не удалось сохранить объект');
      } finally {
        setLoading(false);
      }
    },
    [state, isEditMode, params?.id, navigate],
  );

  return (
    <Container
      component='form'
      onSubmit={handleSubmit}
      p={0}
    >
      <Stack
        py='sm'
        px='md'
        gap='md'
      >
        <Title order={3}>{isEditMode ? 'Изменение объекта' : 'Создание объекта'}</Title>

        <Stepper
          active={0}
          size='xs'
        >
          <Stepper.Step icon={<IconBuilding size={16} />}>
            <PropertyInfoForm />
          </Stepper.Step>
          <Stepper.Step icon={<IconUser size={16} />}>
            <OwnerInfoForm />
          </Stepper.Step>
          <Stepper.Step icon={<IconUsers size={16} />}>
            <PropertyInfoForm />
          </Stepper.Step>
          {/* <Stack gap='md'>
              <TextInput
                label='Название'
                placeholder='ЖК Lucky'
                required
                value={state.name}
                onChange={(ev) => setState((s) => ({ ...s, name: ev.currentTarget?.value }))}
              />
              <SegmentedControl
                fullWidth
                data={dealTypes}
                value={state.dealType}
                onChange={(v) => setState((s) => ({ ...s, dealType: (v as 'sale' | 'rent') ?? 'sale' }))}
              />
              <NumberInput
                label='Цена'
                placeholder={state.dealType === 'sale' ? '15,000,000' : '80,000'}
                value={state.amount}
                onChange={(v) => setState((s) => ({ ...s, amount: Number.isFinite(v as number) ? (v as number) : '' }))}
                min={0}
                rightSection={'₽'}
                thousandSeparator
              />
              <Group wrap='nowrap'>
                <NumberInput
                  label='Этаж'
                  placeholder='7'
                  value={state.floorNumber}
                  onChange={(v) =>
                    setState((s) => ({
                      ...s,
                      floorNumber: Number.isFinite(v as number) ? (v as number) : '',
                    }))
                  }
                  min={0}
                />
                <NumberInput
                  label='Всего этажей'
                  placeholder='19'
                  value={state.floorTotal}
                  onChange={(v) =>
                    setState((s) => ({ ...s, floorTotal: Number.isFinite(v as number) ? (v as number) : '' }))
                  }
                  min={0}
                />
              </Group>
              <NumberInput
                label='Площадь'
                placeholder='69'
                value={state.area}
                onChange={(v) => setState((s) => ({ ...s, area: Number.isFinite(v as number) ? (v as number) : '' }))}
                min={0}
                rightSection={'м²'}
                thousandSeparator
              />

              {error ? <Box c='red.6'>{error}</Box> : null}

              <Group justify='flex-end'>
                <Button
                  variant='default'
                  onClick={() => navigate(-1)}
                  disabled={loading}
                >
                  Отмена
                </Button>
                <Button
                  type='submit'
                  loading={loading}
                >
                  {isEditMode ? 'Сохранить' : 'Создать'}
                </Button>
              </Group>
            </Stack> */}
        </Stepper>
      </Stack>
    </Container>
  );
};
