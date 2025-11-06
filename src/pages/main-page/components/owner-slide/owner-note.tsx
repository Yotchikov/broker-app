import { Card, Group, Stack, Text, Textarea } from '@mantine/core';
import { IconNote } from '@tabler/icons-react';
import { ownerDataProvider } from '../../../../data';
import { useEffect, useState, type FC } from 'react';

type OwnerNoteProps = {
  ownerId: string;
};

export const OwnerNote: FC<OwnerNoteProps> = (props: OwnerNoteProps) => {
  const { ownerId } = props;

  const [note, setNote] = useState('');

  useEffect(() => {
    ownerDataProvider.getOwnerById(ownerId).then((owner) => {
      setNote(owner.note || '');
    });
  }, [ownerId]);

  const handleNoteChange = async (note: string) => {
    setNote(note);
    await ownerDataProvider.updateOwner({ id: ownerId, note });
  };

  return (
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
        <Text size='md'>Пожелания собственника</Text>
      </Group>
      <Card
        radius='lg'
        px='md'
        py='xs'
      >
        <Textarea
          variant='unstyled'
          placeholder='Например: без детей, без животных, без курения, и т.д.'
          autosize
          size='md'
          value={note}
          minRows={3}
          maxRows={10}
          onChange={(ev) => handleNoteChange(ev.currentTarget.value)}
        />
      </Card>
    </Stack>
  );
};
