// components/GameContainer.tsx
import { FC, useState, useEffect } from 'react';
import MultipleChoice from '@components/game-modes/MultipleChoice';
import Flashcard from '@components/game-modes/Flashcard';
import SpellingChallenge from '@components/game-modes/SpellingChallenge';
import Feedback from '@components/feedback/Feedback';
import { GameModeType, ExamType, WordType, FeedbackType, OptionType } from '@/types/index';
import styles from './GameContainer.module.css';
import { getRandomWord, getWordOptions } from '@/lib/vocabulary';

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
  const [options, setOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<FeedbackType>({ show: false, correct: false });

  useEffect(() => {
    fetchRandomWord();
  }, [examType]);

  // เพิ่มส่วนนี้: Timer effect สำหรับนับเวลาถอยหลัง
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!feedback.show && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !feedback.show) {
      // หมดเวลา ให้ถือว่าตอบผิด
      handleAnswer(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, feedback.show]);

  const fetchRandomWord = () => {
    setIsLoading(true);
    try {
      // เรียกใช้ฟังก์ชันที่เราสร้างขึ้นแทนการเรียก API
      const word = getRandomWord(examType);
      setCurrentWord(word);
      
      if (gameMode === 'multiple-choice') {
        const wordOptions = getWordOptions(word.id, examType);
        setOptions(wordOptions);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching vocabulary:', error);
      setIsLoading(false);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    // แสดงผลลัพธ์
    setFeedback({
      show: true,
      correct: isCorrect,
      message: isCorrect ? 'ถูกต้อง!' : 'ไม่ถูกต้อง!'
    });
    
    // อัพเดตคะแนนและ streak
    if (isCorrect) {
      const streakBonus = Math.min(streak * 2, 20); // จำกัด streak bonus ไว้ที่ 20
      setScore(score + 10 + streakBonus);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    
    // รีเซ็ตหลังจากรอสักครู่
    setTimeout(() => {
      setFeedback({ show: false, correct: false });
      fetchRandomWord();
      setTimeLeft(30); // รีเซ็ตเวลา
    }, 1500);
  };

  if (isLoading || !currentWord) {
    return <div className={styles.loading}>กำลังโหลด...</div>;
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