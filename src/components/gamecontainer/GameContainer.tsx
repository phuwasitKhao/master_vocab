// components/GameContainer.tsx
import { FC, useState, useEffect } from 'react';
import MultipleChoice from '@components/game-modes/MultipleChoice';
import Flashcard from '@components/game-modes/Flashcard';
import SpellingChallenge from '@components/game-modes/SpellingChallenge';
import Feedback from '@components/feedback/Feedback';
import { GameModeType, ExamType, WordType, FeedbackType } from '../../types/index';
import styles from './GameContainer.module.css';

interface GameContainerProps {
  gameMode: GameModeType;
  examType: ExamType;
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  score: number;
  setScore: (score: number) => void;
  streak: number;
  setStreak: (streak: number) => void;
}

const GameContainer: FC<GameContainerProps> = ({
  gameMode,
  examType,
  timeLeft,
  setTimeLeft,
  score,
  setScore,
  streak,
  setStreak
}) => {
  const [currentWord, setCurrentWord] = useState<WordType | null>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<FeedbackType>({ show: false, correct: false });

  useEffect(() => {
    fetchRandomWord();
  }, [examType]);

  const fetchRandomWord = async () => {
    setIsLoading(true);
    try {
      // This would be a real API call in production
      const response = await fetch(`/api/words/random?examType=${examType}`);
      const data = await response.json();
      setCurrentWord(data);

      if (gameMode === 'multiple-choice') {
        const optionsResponse = await fetch(`/api/words/options?wordId=${data.id}&examType=${examType}`);
        const optionsData = await optionsResponse.json();
        setOptions(optionsData.options);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching vocabulary:', error);
      setIsLoading(false);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    // Show feedback
    setFeedback({
      show: true,
      correct: isCorrect,
      message: isCorrect ? 'Correct!' : 'Incorrect!'
    });

    // Update score and streak
    if (isCorrect) {
      const streakBonus = Math.min(streak * 2, 20); // Cap streak bonus at 20
      setScore(score + 10 + streakBonus);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    // Reset after brief delay
    setTimeout(() => {
      setFeedback({ show: false, correct: false });
      fetchRandomWord();
      setTimeLeft(30); // Reset timer
    }, 1500);
  };

  if (isLoading || !currentWord) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.gameContainer}>
      {feedback.show && (
        <Feedback
          correct={feedback.correct}
          message={feedback.message}
        />
      )}

      {!feedback.show && (
        <>
          {gameMode === 'multiple-choice' && (
            <MultipleChoice
              word={currentWord}
              options={options}
              onAnswer={handleAnswer}
            />
          )}

          {gameMode === 'flashcard' && (
            <Flashcard
              word={currentWord}
              onAnswer={handleAnswer}
            />
          )}

          {gameMode === 'spelling' && (
            <SpellingChallenge
              word={currentWord}
              onAnswer={handleAnswer}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GameContainer;
