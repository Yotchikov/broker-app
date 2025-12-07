import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { EmptyDisclaimer } from '../../../app/components';

export const PropertyListEmptyDisclaimer = () => {
  const navigate = useNavigate();

  return (
    <EmptyDisclaimer
      title='Пока нет объектов'
      description={
        <>
          Вы не можете добавлять клиентов,
          <br />
          пока у вас не будет хотя бы один объект
        </>
      }
      button={
        <Button
          size='md'
          radius='lg'
          leftSection={
            <IconPlus
              size={16}
              stroke={1.8}
            />
          }
          variant='light'
          onClick={() => navigate('/properties/create')}
          fullWidth
        >
          Добавить объект
        </Button>
      }
    />
  );
};
