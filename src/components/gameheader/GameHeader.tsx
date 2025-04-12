// components/GameHeader.tsx
import { FC } from 'react';
import { ExamType } from '../../types/index'
import styles from '../gameheader/GameHeader.module.css';

interface GameHeaderProps {
  score: number;
  timeLeft: number;
  streak: number;
  examType: ExamType;
  onExitGame: () => void;
}

const GameHeader: FC<GameHeaderProps> = ({
  score,
  timeLeft,
  streak,
  examType,
  onExitGame
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.examBadge}>
        {examType.toUpperCase()}
      </div>

      <div className={styles.scoreContainer}>
        <span className={styles.scoreLabel}>Score:</span>
        <span className={styles.scoreValue}>{score}</span>
      </div>

      <div className={styles.timerContainer}>
        <div
          className={styles.timerProgress}
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        />
        <span className={styles.timerText}>{timeLeft}s</span>
      </div>

      <div className={styles.streakContainer}>
        <span className={styles.streakValue}>{streak}</span>
        <span className={styles.streakLabel}>Streak</span>
      </div>

      <button
        className={styles.exitButton}
        onClick={onExitGame}
      >
        Exit
      </button>
    </div>
  );
};

export default GameHeader;
