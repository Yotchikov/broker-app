import type { FC } from 'react';
import { useParams } from 'react-router';
import { Container, Space, Stack, Stepper, Title } from '@mantine/core';
import { IconBuilding, IconUser, IconUsers } from '@tabler/icons-react';
import { OwnerInfoForm, PropertyInfoForm, ProspectsInfoForm, FormFooter } from './components';
import { PropertyFormProvider, usePropertyForm } from './context';

const PropertyFormContent: FC = () => {
  const params = useParams();
  const isEditMode = Boolean(params?.id);
  const { currentStep } = usePropertyForm();

  return (
    <Container
      p={0}
      h='100%'
      style={{ overflow: 'auto' }}
    >
      <Stack
        py='sm'
        px='md'
        h='100%'
        justify='space-between'
      >
        <Stack gap='md'>
          <Title order={2}>{isEditMode ? 'Изменение объекта' : 'Создание объекта'}</Title>
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
        <Space h={76} />
        <FormFooter />
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
