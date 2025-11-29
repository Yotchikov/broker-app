import { Group, Stack, Text, Textarea } from '@mantine/core';
import { IconNote } from '@tabler/icons-react';
import { propertyDataProvider } from '../../../../data';
import { useEffect, useState, type FC } from 'react';

type PropertyNoteProps = {
  propertyId: string;
};

export const PropertyNote: FC<PropertyNoteProps> = (props: PropertyNoteProps) => {
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
    <Stack gap='4'>
      <Group
        ml='md'
        gap='xs'
        c='dimmed'
      >
        <IconNote
          size={20}
          stroke={1.8}
        />
        <Text size='md'>Особенности объекта</Text>
      </Group>
      <Textarea
        placeholder='Например: нужен клининг, ремонт, когда освободится, и т.д.'
        autosize
        size='md'
        value={note}
        minRows={3}
        maxRows={10}
        onChange={(ev) => handleNoteChange(ev.currentTarget.value)}
        radius='lg'
      />
    </Stack>
  );
};
