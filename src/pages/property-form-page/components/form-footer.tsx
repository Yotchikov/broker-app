import { Group, Button, Box } from '@mantine/core';
import { usePropertyForm } from '../context';
import { BOTTOM_NAVBAR_HEIGHT, BOTTOM_NAVBAR_BOTTOM_PADDING } from '../../../app/components/bottom-navbar';
import { BOTTOM_NAVBAR_TOP_PADDING } from '../../../app/components/bottom-navbar/consts';

export const FORM_FOOTER_HEIGHT = 42;

export const FormFooter = () => {
  const { prevStep, nextStep, submitForm, isLoading } = usePropertyForm();

  return (
    <Group
      justify='space-between'
      pos='fixed'
      bottom={BOTTOM_NAVBAR_HEIGHT + BOTTOM_NAVBAR_BOTTOM_PADDING + BOTTOM_NAVBAR_TOP_PADDING}
      px='md'
      left={0}
      right={0}
      style={{ zIndex: 100 }}
    >
      {prevStep ? (
        <Button
          variant='light'
          size='md'
          radius='lg'
          onClick={prevStep}
          loading={isLoading}
          style={{ backdropFilter: 'blur(14px)' }}
        >
          Назад
        </Button>
      ) : (
        <Box />
      )}
      {nextStep ? (
        <Button
          size='md'
          radius='lg'
          onClick={nextStep}
          loading={isLoading}
        >
          Далее
        </Button>
      ) : (
        <Button
          size='md'
          radius='lg'
          onClick={submitForm}
          loading={isLoading}
        >
          Готово
        </Button>
      )}
    </Group>
  );
};
