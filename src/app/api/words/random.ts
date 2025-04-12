// pages/api/words/random.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import { WordType } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { examType } = req.query;
    const { db } = await connectToDatabase();

    // Find words matching the exam type
    const query = examType ? { examType: { $in: [examType] } } : {};

    // Get a random word
    const count = await db.collection('vocabulary').countDocuments(query);
    const random = Math.floor(Math.random() * count);
    const word = await db.collection('vocabulary').findOne(query, { skip: random });

    if (!word) {
      return res.status(404).json({ message: 'No words found' });
    }

    // Update times shown
    await db.collection('vocabulary').updateOne(
      { _id: word._id },
      { $inc: { timesShown: 1 } }
    );

    return res.status(200).json({
      id: word._id.toString(),
      word: word.word,
      definition: word.definition,
      example: word.example,
      partOfSpeech: word.partOfSpeech,
      examType: word.examType,
      difficulty: word.difficulty
    });
  } catch (error) {
    console.error('Error fetching random word:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
