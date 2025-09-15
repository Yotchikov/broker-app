import { usePropertyForm } from '../context';
import { Box, Button, Group, Stack, TextInput, Title } from '@mantine/core';

export const OwnerInfoForm = () => {
  const { formData, updateOwnerInfo, nextStep, prevStep, isLoading: loading, error } = usePropertyForm();

  return (
    <Stack gap='md'>
      <Title order={4}>Собственник</Title>
      <TextInput
        label='Имя'
        placeholder='Иван Иванов'
        required
        value={formData.ownerName}
        onChange={(ev) => updateOwnerInfo({ ownerName: ev.currentTarget.value })}
      />

      <TextInput
        label='Эмодзи'
        placeholder='👤'
        value={formData.ownerEmoji}
        onChange={(ev) => updateOwnerInfo({ ownerEmoji: ev.currentTarget.value })}
      />

      <TextInput
        label='Телефон'
        placeholder='+7 (999) 123-45-67'
        value={formData.ownerPhone}
        onChange={(ev) => updateOwnerInfo({ ownerPhone: ev.currentTarget.value })}
      />

      <TextInput
        label='Email'
        placeholder='ivan@example.com'
        type='email'
        value={formData.ownerEmail}
        onChange={(ev) => updateOwnerInfo({ ownerEmail: ev.currentTarget.value })}
      />

      <TextInput
        label='Telegram'
        placeholder='@username'
        value={formData.ownerTelegram}
        onChange={(ev) => updateOwnerInfo({ ownerTelegram: ev.currentTarget.value })}
      />

      <TextInput
        label='WhatsApp'
        placeholder='+7 (999) 123-45-67'
        value={formData.ownerWhatsapp}
        onChange={(ev) => updateOwnerInfo({ ownerWhatsapp: ev.currentTarget.value })}
      />

      {error && <Box c='red.6'>{error}</Box>}

      <Group justify='space-between'>
        <Button
          variant='light'
          onClick={prevStep}
          disabled={loading}
        >
          Назад
        </Button>
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
