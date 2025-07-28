import ChevronLeft24 from 'ui-kit/icons/svgs/chevron-left-24.svg?react';
import styles from './page-header.module.css';
import { useNavigate } from 'react-router';

export const PageHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageHeader}>
      <div
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <ChevronLeft24 />
        Назад
      </div>
    </div>
  );
};
