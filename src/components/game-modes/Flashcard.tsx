// components/game-modes/Flashcard.tsx
import { FC, useState } from 'react';
import { WordType } from '../../types';
import styles from './styles/Flashcard.module.css';

interface FlashcardProps {
  word: WordType;
  onAnswer: (isCorrect: boolean) => void;
}

const Flashcard: FC<FlashcardProps> = ({ word, onAnswer }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [hasRevealed, setHasRevealed] = useState<boolean>(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!hasRevealed && !isFlipped) {
      setHasRevealed(true);
    }
  };

  const handleKnew = () => {
    onAnswer(true);
    reset();
  };

  const handleDidntKnow = () => {
    onAnswer(false);
    reset();
  };

  const reset = () => {
    setIsFlipped(false);
    setHasRevealed(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`}
        onClick={handleFlip}
      >
        <div className={styles.front}>
          <h2>{word.word}</h2>
          <p className={styles.instruction}>Tap to reveal definition</p>
        </div>
        <div className={styles.back}>
          <h3>Definition:</h3>
          <p>{word.definition}</p>
          <h3>Example:</h3>
          <p>{word.example}</p>
        </div>
      </div>

      {hasRevealed && (
        <div className={styles.buttons}>
          <button
            className={styles.knewButton}
            onClick={handleKnew}
          >
            I knew it
          </button>
          <button
            className={styles.didntKnowButton}
            onClick={handleDidntKnow}
          >
            Didn't know
          </button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
