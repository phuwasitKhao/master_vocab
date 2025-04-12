import { FC } from 'react';
import { GameModeType } from '@/types/index';
import styles from '../gamemodeselector/GameModeSelector.module.css'

interface GameModeSelectorProps {
  gameMode: GameModeType;
  onChange: (mode: GameModeType) => void;
}

const GameModeSelector: FC<GameModeSelectorProps> = ({ gameMode, onChange }) => {
  return (
    <div className={styles.container}>
      <p className={styles.label}>Choose Game Mode:</p>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${gameMode === 'multiple-choice' ? styles.active : ''}`}
          onClick={() => onChange('multiple-choice')}
        >
          Multiple Choice
        </button>
        <button
          className={`${styles.button} ${gameMode === 'flashcard' ? styles.active : ''}`}
          onClick={() => onChange('flashcard')}
        >
          Flashcards
        </button>
        <button
          className={`${styles.button} ${gameMode === 'spelling' ? styles.active : ''}`}
          onClick={() => onChange('spelling')}
        >
          Spelling Challenge
        </button>
      </div>
    </div>
  );
};

export default GameModeSelector;