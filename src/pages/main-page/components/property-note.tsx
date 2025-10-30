import { Card, Group, Stack, Text, Textarea } from '@mantine/core';
import { IconNote } from '@tabler/icons-react';
import { propertyDataProvider } from '../../../data';
import { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';

type PropertyNoteProps = {
  propertyId: string;
};

export const PropertyNote = (props: PropertyNoteProps) => {
  const { propertyId } = props;

  const [note, setNote] = useState('');

  useEffect(() => {
    propertyDataProvider.getPropertyById(propertyId).then((property) => {
      setNote(property.note || '');
    });
  }, [propertyId]);

  const handleNoteChange = async (note: string) => {
    setNote(note);
    await propertyDataProvider.updateProperty({ id: propertyId, note });
  };

  return (
    <Carousel.Slide>
      <Stack gap='xs'>
        <Group
          ml='md'
          gap='xs'
          c='dimmed'
        >
          <IconNote
            size={20}
            stroke={1.8}
          />
          <Text size='md'>Заметка</Text>
        </Group>
        <Card
          radius='lg'
          px='md'
          py='xs'
        >
          <Textarea
            variant='unstyled'
            placeholder='Любая важная информация...'
            autosize
            size='md'
            value={note}
            minRows={3}
            maxRows={10}
            onChange={(ev) => handleNoteChange(ev.currentTarget.value)}
          />
        </Card>
      </Stack>
    </Carousel.Slide>
  );
};
