import { useEffect, useState, type FC } from 'react';
import { useLoaderData } from 'react-router';
import { Container, Stack, Button, NativeSelect, Title, Notification } from '@mantine/core';
import { PropertyFormProvider, usePropertyForm } from '../property-form-page/context';
import { ProspectInfoForm } from '../property-form-page/components';
import type { Property } from '../../data';
import { PropertyListEmptyDisclaimer } from './components';

const ProspectFormContent: FC = () => {
  const { formData, addProspect, updateProspect, submitForm, setError, error } = usePropertyForm();

  useEffect(() => {
    addProspect({
      id: crypto.randomUUID(),
      name: '',
      status: 'inquired',
      contacts: {},
    });
  }, [formData.property.id]);

  const prospectIndex = 0;
  const prospect = formData.prospects[prospectIndex];

  return (
    <Stack gap='md'>
      <ProspectInfoForm
        prospect={prospect}
        handleUpdateProspect={(field, value) => updateProspect(prospectIndex, { [field]: value })}
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
      <Button
        size='md'
        radius='lg'
        onClick={submitForm}
      >
        Сохранить
      </Button>
    </Stack>
  );
};

export const ProspectFormPage: FC = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(properties[0]?.id || '');

  if (properties.length === 0) {
    return <PropertyListEmptyDisclaimer />;
  }

  const propertyOptions = properties.map((property) => ({
    value: property.id,
    label: property.name,
  }));

  return (
    <Container
      p={0}
      h='100%'
      style={{ overflow: 'auto' }}
    >
      <Stack
        py='sm'
        px='sm'
        h='100%'
        justify='space-between'
      >
        <Stack gap='md'>
          <Title order={2}>Добавление клиента</Title>
          <NativeSelect
            label='Объект'
            size='md'
            radius='lg'
            required
            data={propertyOptions}
            value={selectedPropertyId}
            onChange={(event) => setSelectedPropertyId(event.currentTarget.value)}
          />
          <PropertyFormProvider
            key={selectedPropertyId}
            propertyId={selectedPropertyId}
          >
            <ProspectFormContent />
          </PropertyFormProvider>
        </Stack>
      </Stack>
    </Container>
  );
};
