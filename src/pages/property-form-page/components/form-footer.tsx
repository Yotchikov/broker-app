import { Group, Button, Box } from '@mantine/core';
import { usePropertyForm } from '../context';
import { BOTTOM_NAVBAR_HEIGHT } from '../../../app/components/bottom-navbar';

export const FormFooter = () => {
  const { prevStep, nextStep, submitForm, isLoading } = usePropertyForm();

  return (
    <Group
      justify='space-between'
      pos='fixed'
      bottom={BOTTOM_NAVBAR_HEIGHT}
      p='md'
      left={0}
      right={0}
      bg='var(--mantine-color-body)'
      style={{ boxShadow: '0 -10px 10px var(--mantine-color-body)', zIndex: 1000 }}
      //   bg='linear-gradient(to bottom, transparent 0%, var(--mantine-color-body) 50%)'
    >
      {prevStep ? (
        <Button
          variant='light'
          size='lg'
          radius='xl'
          onClick={prevStep}
          loading={isLoading}
        >
          Назад
        </Button>
      ) : (
        <Box />
      )}
      {nextStep ? (
        <Button
          size='lg'
          radius='xl'
          onClick={nextStep}
          loading={isLoading}
        >
          Далее
        </Button>
      ) : (
        <Button
          size='lg'
          radius='xl'
          onClick={submitForm}
          loading={isLoading}
        >
          Готово
        </Button>
      )}
    </Group>
  );
};
