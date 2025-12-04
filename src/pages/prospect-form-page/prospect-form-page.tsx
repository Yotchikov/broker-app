import { useEffect, useState, type FC } from 'react';
import { useLoaderData } from 'react-router';
import { Container, Stack, Button, NativeSelect, Title, Notification, Box } from '@mantine/core';
import { PropertyFormProvider, usePropertyForm } from '../property-form-page/context';
import { ProspectInfoForm } from '../property-form-page/components';
import type { Property } from '../../data';
import { PropertyListEmptyDisclaimer } from './components';
import { BOTTOM_NAVBAR_HEIGHT, BOTTOM_NAVBAR_BOTTOM_PADDING } from '../../app/components';
import { BOTTOM_NAVBAR_TOP_PADDING } from '../../app/components/bottom-navbar/consts';
import { IconExclamationMark } from '@tabler/icons-react';

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
      <Box h={BOTTOM_NAVBAR_HEIGHT + BOTTOM_NAVBAR_BOTTOM_PADDING + BOTTOM_NAVBAR_TOP_PADDING + 42} />
      <Stack
        justify='space-between'
        pos='fixed'
        bottom={BOTTOM_NAVBAR_HEIGHT + BOTTOM_NAVBAR_BOTTOM_PADDING + BOTTOM_NAVBAR_TOP_PADDING}
        px='md'
        left={0}
        right={0}
        style={{ zIndex: 100 }}
      >
        {error && (
          <Notification
            icon={<IconExclamationMark size={16} />}
            color='red'
            radius={'lg'}
            onClose={() => setError(null)}
            bg='red.1'
          >
            {error}
          </Notification>
        )}
        <Button
          size='md'
          radius='lg'
          onClick={submitForm}
          fullWidth
        >
          Сохранить
        </Button>
      </Stack>
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
