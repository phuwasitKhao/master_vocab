import { FC } from 'react';
import styles from '../feedback/Feedback.module.css';

interface FeedbackProps {
  correct: boolean;
  message?: string;
}

const Feedback: FC<FeedbackProps> = ({ correct, message }) => {
  return (
    <div className={`${styles.container} ${correct ? styles.correct : styles.incorrect}`}>
      <div className={styles.icon}>{correct ? '✓' : '✗'}</div>
      <div className={styles.message}>{message || (correct ? 'Correct!' : 'Incorrect!')}</div>
    </div>
  );
};

export default Feedback;