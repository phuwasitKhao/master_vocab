// components/game-modes/SpellingChallenge.tsx
import { FC, useState, useEffect } from 'react';
import { WordType } from '../../types';
import styles from './styles/SpellingChallenge.module.css';

interface SpellingChallengeProps {
  word: WordType;
  onAnswer: (isCorrect: boolean) => void;
}

const SpellingChallenge: FC<SpellingChallengeProps> = ({
  word,
  onAnswer
}) => {
  const [userInput, setUserInput] = useState<string>('');

  useEffect(() => {
    // Clear input when word changes
    setUserInput('');
  }, [word]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = userInput.trim().toLowerCase() === word.word.toLowerCase();
    onAnswer(isCorrect);
  };

  return (
    <div className={styles.container}>
      <div className={styles.definitionBox}>
        <h3>Definition:</h3>
        <p>{word.definition}</p>
        {word.example && (
          <>
            <h3>Example:</h3>
            <p>{word.example.replace(word.word, '_____')}</p>
          </>
        )}
      </div>

      <form className={styles.spellingForm} onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type the word here..."
          className={styles.spellingInput}
          autoFocus
        />
        <button
          type="submit"
          className={styles.submitButton}
        >
          Check
        </button>
      </form>
    </div>
  );
};

export default SpellingChallenge;
