import { FC } from 'react';
import { ExamType } from '../../types/index';
import styles from '../examtypeselector/ExamTypeSelector.module.css';

interface ExamTypeSelectorProps {
  examType: ExamType;
  onChange: (type: ExamType) => void;
}

const ExamTypeSelector: FC<ExamTypeSelectorProps> = ({ examType, onChange }) => {
  return (
    <div className={styles.container}>
      <p className={styles.label}>Select Exam Type:</p>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${examType === 'toeic' ? styles.active : ''}`}
          onClick={() => onChange('toeic')}
        >
          TOEIC
        </button>
        <button
          className={`${styles.button} ${examType === 'ielts' ? styles.active : ''}`}
          onClick={() => onChange('ielts')}
        >
          IELTS
        </button>
      </div>
    </div>
  );
};

export default ExamTypeSelector;