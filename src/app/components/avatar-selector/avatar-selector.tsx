import React from 'react';
import { Modal, SimpleGrid, Box, Button, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import styles from './avatar-selector.module.css';

type AvatarSelectorProps = {
  selectedAvatar?: string;
  onAvatarSelect: (avatarPath: string) => void;
  size?: number;
};

const AVATAR_PATHS = Array.from({ length: 36 }, (_, i) => `/memoji/Avatar-${i + 1}.png`);

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selectedAvatar, onAvatarSelect, size = 64 }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleAvatarClick = (avatarPath: string) => {
    onAvatarSelect(avatarPath);
    close();
  };

  return (
    <>
      <Avatar
        src={selectedAvatar}
        alt='Selected avatar'
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: '2px solid #e9ecef',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backgroundColor: '#f8f9fa',
          transition: 'all 0.2s ease',
        }}
        onClick={open}
      />
      <Modal
        opened={opened}
        onClose={close}
        title='Выберите аватар'
        size='lg'
        centered
      >
        <SimpleGrid
          cols={5}
          spacing='md'
        >
          {AVATAR_PATHS.map((avatarPath) => (
            <Avatar
              key={avatarPath}
              className={styles.avatarOption}
              onClick={() => handleAvatarClick(avatarPath)}
              src={avatarPath}
              alt={`Avatar ${avatarPath.split('-')[1]?.split('.')[0]}`}
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: selectedAvatar === avatarPath ? '3px solid #228be6' : '2px solid #e9ecef',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </SimpleGrid>
        <Box
          mt='md'
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button
            variant='light'
            onClick={close}
          >
            Отмена
          </Button>
        </Box>
      </Modal>
    </>
  );
};
