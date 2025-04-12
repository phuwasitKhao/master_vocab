// src/models/UserProgress.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProgress extends Document {
  userId: string;
  wordId: mongoose.Types.ObjectId;
  correct: number;
  incorrect: number;
  lastSeen: Date;
}

const UserProgressSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  wordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true },
  correct: { type: Number, default: 0 },
  incorrect: { type: Number, default: 0 },
  lastSeen: { type: Date, default: Date.now }
});

// Create compound index on userId and wordId
UserProgressSchema.index({ userId: 1, wordId: 1 }, { unique: true });

export default mongoose.models.UserProgress || 
  mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);