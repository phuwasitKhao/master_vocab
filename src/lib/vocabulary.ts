// src/lib/vocabulary.ts
import vocabularyData from '../data/vocabulary.json';
import { WordType, ExamType, OptionType } from '@/types/index';

export function getRandomWord(examType?: ExamType): WordType {
  // เลือกชุดคำศัพท์ตามประเภทการสอบ
  let wordPool: any[] = [];
  
  if (examType === 'toeic') {
    wordPool = [...vocabularyData.toeic, ...vocabularyData.both];
  } else if (examType === 'ielts') {
    wordPool = [...vocabularyData.ielts, ...vocabularyData.both];
  } else {
    wordPool = [
      ...vocabularyData.toeic, 
      ...vocabularyData.ielts, 
      ...vocabularyData.both
    ];
  }
  
  // สุ่มคำศัพท์
  const randomIndex = Math.floor(Math.random() * wordPool.length);
  const randomWord = wordPool[randomIndex];
  
  return {
    id: randomWord.id,
    word: randomWord.word,
    definition: randomWord.definition,
    example: randomWord.example,
    partOfSpeech: randomWord.partOfSpeech,
    examType: examType ? [examType] : ['toeic', 'ielts'],
    difficulty: randomWord.difficulty
  };
}

export function getWordOptions(wordId: string, examType?: ExamType): OptionType[] {
  // หาคำศัพท์ที่ถูกต้อง
  let correctWord: any = null;
  let wordPool: any[] = [];
  
  // กำหนดกลุ่มคำศัพท์ที่จะค้นหา
  if (examType === 'toeic') {
    wordPool = [...vocabularyData.toeic, ...vocabularyData.both];
  } else if (examType === 'ielts') {
    wordPool = [...vocabularyData.ielts, ...vocabularyData.both];
  } else {
    wordPool = [
      ...vocabularyData.toeic, 
      ...vocabularyData.ielts, 
      ...vocabularyData.both
    ];
  }
  
  // หาคำศัพท์ที่ถูกต้องจาก ID
  correctWord = wordPool.find(word => word.id === wordId);
  
  if (!correctWord) {
    throw new Error('Word not found');
  }
  
  // หาคำแปลอื่นๆ ที่ไม่ใช่คำแปลที่ถูกต้อง (ทำเป็นตัวเลือกลวง)
  const otherWords = wordPool.filter(word => word.id !== wordId);
  
  // สุ่มคำศัพท์ 3 คำสำหรับเป็นตัวเลือกลวง
  const shuffled = otherWords.sort(() => 0.5 - Math.random());
  const wrongOptions = shuffled.slice(0, 3);
  
  // สร้างตัวเลือกทั้งหมดและสลับตำแหน่ง
  const options = [
    {
      id: '1',
      text: correctWord.definition,
      isCorrect: true
    },
    ...wrongOptions.map((option, index) => ({
      id: (index + 2).toString(),
      text: option.definition,
      isCorrect: false
    }))
  ].sort(() => Math.random() - 0.5);
  
  return options;
}

// เพิ่มฟังก์ชันสำหรับเพิ่มคำศัพท์ใหม่ (ถ้าต้องการ)
export function getAllWords(examType?: ExamType): WordType[] {
  let wordPool: any[] = [];
  
  if (examType === 'toeic') {
    wordPool = [...vocabularyData.toeic, ...vocabularyData.both];
  } else if (examType === 'ielts') {
    wordPool = [...vocabularyData.ielts, ...vocabularyData.both];
  } else {
    wordPool = [
      ...vocabularyData.toeic, 
      ...vocabularyData.ielts, 
      ...vocabularyData.both
    ];
  }
  
  return wordPool.map(word => ({
    id: word.id,
    word: word.word,
    definition: word.definition,
    example: word.example,
    partOfSpeech: word.partOfSpeech,
    examType: examType ? [examType] : ['toeic', 'ielts'],
    difficulty: word.difficulty
  }));
}