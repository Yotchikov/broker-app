import { Button } from '../../../../../packages/ui-kit';
import styles from './submit-button.module.css';
import { useCreatePropertyMutation } from 'data/providers/property';

export const SubmitButton = () => {
  const { mutate: createProperty } = useCreatePropertyMutation();

  const handleClick = () => {
    createProperty({
      id: '1',
      name: 'Test',
      ownerId: '1',
      prospectIds: [],
      dealType: 'sale',
      area: 100,
      floor: { number: 1, total: 10 },
      price: { amount: 1000000, currency: 'RUB' },
    });
  };

  return (
    <div className={styles.root}>
      <Button
        size='l'
        className={styles.submitButton}
        onClick={handleClick}
      >
        Сохранить
      </Button>
    </div>
  );
};
