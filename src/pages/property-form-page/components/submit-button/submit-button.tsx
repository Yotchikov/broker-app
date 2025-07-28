import { Button } from '../../../../../packages/ui-kit';
import styles from './submit-button.module.css';

export const SubmitButton = () => {
  return (
    <div className={styles.root}>
      <Button
        size='l'
        className={styles.submitButton}
      >
        Сохранить
      </Button>
    </div>
  );
};
