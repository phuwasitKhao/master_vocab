"use client";
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import GameHeader from '@components/gameheader/GameHeader';
import GameContainer from '@/components/gamecontainer/GameContainer';
import GameModeSelector from '@components/gamemodeselector/GameModeSelector';
import ExamTypeSelector from '@components/examtypeselector/ExamTypeSelector';
import styles from '../../app/home/Home.module.css';
import { WordType, GameModeType, ExamType } from '@/types/index';

const Home: NextPage = () => {
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [streak, setStreak] = useState<number>(0);
  const [gameMode, setGameMode] = useState<GameModeType>('multiple-choice');
  const [examType, setExamType] = useState<ExamType>('toeic');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
    setIsPlaying(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>VocabMaster: TOEIC & IELTS Vocabulary Game</title>
        <meta name="description" content="A fun way to memorize TOEIC and IELTS vocabulary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!isPlaying ? (
          <div className={styles.startScreen}>
            <h1 className={styles.title}>VocabMaster</h1>
            <p className={styles.description}>
              Master TOEIC and IELTS vocabulary through fun games!
            </p>

            <ExamTypeSelector
              examType={examType}
              onChange={(type) => setExamType(type)}
            />

            <GameModeSelector
              gameMode={gameMode}
              onChange={(mode) => setGameMode(mode)}
            />

            <button
              className={styles.startButton}
              onClick={startGame}
            >
              Start Game
            </button>
          </div>
        ) : (
          <>
            <GameHeader
              score={score}
              timeLeft={timeLeft}
              streak={streak}
              examType={examType}
              onExitGame={() => setIsPlaying(false)}
            />

            <GameContainer
              gameMode={gameMode}
              examType={examType}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              score={score}
              setScore={setScore}
              streak={streak}
              setStreak={setStreak}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
