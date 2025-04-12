// components/game-modes/MultipleChoice.tsx
import { FC, useState } from 'react';
import { WordType, OptionType } from '../../types';
import styles from './styles/MultipleChoice.module.css';

interface MultipleChoiceProps {
  word: WordType;
  options: OptionType[];
  onAnswer: (isCorrect: boolean) => void;
}

const MultipleChoice: FC<MultipleChoiceProps> = ({
  word,
  options,
  onAnswer
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.wordDisplay}>{word.word}</h2>
      <p className={styles.instruction}>Select the correct definition:</p>

      <div className={styles.optionsGrid}>
        {options.map((option) => (
          <button
            key={option.id}
            className={styles.optionButton}
            onClick={() => onAnswer(option.isCorrect)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
