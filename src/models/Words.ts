// src/models/Word.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IWord extends Document {
  word: string;
  definition: string;
  example: string;
  partOfSpeech: string;
  examType: string[];
  difficulty: number;
  timesShown: number;
  correctAnswers: number;
}

const WordSchema: Schema = new Schema({
  word: { type: String, required: true, index: true },
  definition: { type: String, required: true },
  example: { type: String, required: true },
  partOfSpeech: { type: String, required: true },
  examType: { type: [String], required: true }, // ['toeic', 'ielts']
  difficulty: { type: Number, required: true, min: 1, max: 5 },
  timesShown: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 }
});

export default mongoose.models.Word || mongoose.model<IWord>('Word', WordSchema);