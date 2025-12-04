import type { FC } from 'react';
import { useParams } from 'react-router';
import { Box, Container, Stack, Stepper, Title } from '@mantine/core';
import { IconBuilding, IconUser, IconUsers } from '@tabler/icons-react';
import { OwnerInfoForm, PropertyInfoForm, ProspectListInfoForm, FormFooter } from './components';
import { PropertyFormProvider, usePropertyForm } from './context';
import { BOTTOM_NAVBAR_HEIGHT } from '../../app/components/bottom-navbar';
import { BOTTOM_NAVBAR_BOTTOM_PADDING, BOTTOM_NAVBAR_TOP_PADDING } from '../../app/components/bottom-navbar/consts';
import { FORM_FOOTER_HEIGHT } from './components/form-footer';

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
        px='sm'
        h='100%'
        justify='space-between'
      >
        <Stack gap='md'>
          <Title order={2}>{isEditMode ? 'Изменение объекта' : 'Добавление объекта'}</Title>
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
              <ProspectListInfoForm />
            </Stepper.Step>
          </Stepper>
          <Box
            h={BOTTOM_NAVBAR_BOTTOM_PADDING + BOTTOM_NAVBAR_HEIGHT + BOTTOM_NAVBAR_TOP_PADDING + FORM_FOOTER_HEIGHT}
          />
        </Stack>
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
