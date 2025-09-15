import type { FC } from 'react';
import { useParams } from 'react-router';
import { Container, Stack, Stepper, Title } from '@mantine/core';
import { IconBuilding, IconUser, IconUsers } from '@tabler/icons-react';
import { OwnerInfoForm, PropertyInfoForm, ProspectsInfoForm } from './components';
import { PropertyFormProvider, usePropertyForm } from './context';

const PropertyFormContent: FC = () => {
  const params = useParams();
  const isEditMode = Boolean(params?.id);
  const { currentStep } = usePropertyForm();

  return (
    <Container p={0}>
      <Stack
        py='sm'
        px='md'
        gap='md'
      >
        <Title order={3}>{isEditMode ? 'Изменение объекта' : 'Создание объекта'}</Title>

        <Stepper
          active={currentStep}
          size='xs'
        >
          <Stepper.Step icon={<IconBuilding size={16} />}>
            <PropertyInfoForm />
          </Stepper.Step>
          <Stepper.Step icon={<IconUser size={16} />}>
            <OwnerInfoForm />
          </Stepper.Step>
          <Stepper.Step icon={<IconUsers size={16} />}>
            <ProspectsInfoForm />
          </Stepper.Step>
        </Stepper>
      </Stack>
    </Container>
  );
};

export const PropertyFormPage: FC = () => {
  return (
    <PropertyFormProvider>
      <PropertyFormContent />
    </PropertyFormProvider>
  );
};
