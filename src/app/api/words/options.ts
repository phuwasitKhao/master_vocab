// pages/api/words/options.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { wordId, examType } = req.query;
    const { db } = await connectToDatabase();

    // Get the correct word
    const correctWord = await db.collection('vocabulary').findOne({
      _id: new ObjectId(wordId as string)
    });

    if (!correctWord) {
      return res.status(404).json({ message: 'Word not found' });
    }

    // Get 3 random incorrect options
    const wrongOptions = await db.collection('vocabulary')
      .aggregate([
        {
          $match: {
            _id: { $ne: new ObjectId(wordId as string) },
            examType: { $in: [examType] }
          }
        },
        { $sample: { size: 3 } },
        { $project: { _id: 1, definition: 1 } }
      ])
      .toArray();

    // Create options array with correct and incorrect answers
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
    ];

    // Shuffle the options
    const shuffledOptions = options.sort(() => Math.random() - 0.5);

    return res.status(200).json({ options: shuffledOptions });
  } catch (error) {
    console.error('Error fetching options:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
