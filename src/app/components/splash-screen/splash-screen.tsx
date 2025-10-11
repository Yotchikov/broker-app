import { useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import styles from './splash-screen.module.css';
import Logo from '../../../../public/images/logo.svg?react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Add a small delay for the fade out animation
      setTimeout(onComplete, 300);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      className={styles.splashScreen}
      style={{
        backgroundColor: 'var(--mantine-color-body)',
      }}
    >
      <Box className={styles.logoContainer}>
        <Logo className={styles.logo} />
      </Box>
    </Box>
  );
};
