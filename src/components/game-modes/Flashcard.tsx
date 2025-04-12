// src/components/game-modes/Flashcard.tsx
import { FC, useState } from 'react';
import { WordType } from '@/types/index';
import styles from '../../components/game-modes/styles/Flashcard.module.css';

interface FlashcardProps {
  word: WordType;
  onAnswer: (isCorrect: boolean) => void;
}

const Flashcard: FC<FlashcardProps> = ({ word, onAnswer }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleKnew = () => {
    onAnswer(true);
  };
  
  const handleDidntKnow = () => {
    onAnswer(false);
  };
  
  return (
    <div className={styles.container}>
      <div 
        className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`}
        onClick={handleFlip}
      >
        <div className={styles.front}>
          <h2 className={styles.word}>{word.word}</h2>
          <p className={styles.instruction}>คลิกเพื่อดูคำแปล</p>
        </div>
        <div className={styles.back}>
          <h3>Definition:</h3>
          <p className={styles.definition}>{word.definition}</p>
          <h3>Example:</h3>
          <p className={styles.example}>{word.example}</p>
        </div>
      </div>
      
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
    </div>
  );
};

export default Flashcard;