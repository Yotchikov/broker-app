import { Group, Button, Box } from '@mantine/core';
import { usePropertyForm } from '../context';
import { BOTTOM_NAVBAR_HEIGHT } from '../../../app/components/bottom-navbar';

export const FormFooter = () => {
  const { prevStep, nextStep, submitForm, isLoading } = usePropertyForm();

  return (
    <Group
      justify='space-between'
      pos='fixed'
      bottom={BOTTOM_NAVBAR_HEIGHT + 32 + 16}
      px='md'
      left={0}
      right={0}
      style={{ zIndex: 100 }}
    >
      {prevStep ? (
        <Button
          variant='light'
          size='lg'
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
          size='lg'
          radius='lg'
          onClick={nextStep}
          loading={isLoading}
        >
          Далее
        </Button>
      ) : (
        <Button
          size='lg'
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
