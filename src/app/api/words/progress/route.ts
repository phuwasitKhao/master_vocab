// // src/app/api/progress/route.ts
// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
// import UserProgress from '@/models/UserProgress';
// import Word from '@/models/Word';

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { userId, wordId, isCorrect } = body;
    
//     if (!userId || !wordId) {
//       return NextResponse.json({ error: 'User ID and Word ID are required' }, { status: 400 });
//     }

//     await dbConnect();
    
//     // หาหรือสร้างข้อมูลความก้าวหน้าของผู้ใช้
//     let progress = await UserProgress.findOne({ userId, wordId });
    
//     if (!progress) {
//       progress = new UserProgress({
//         userId,
//         wordId,
//         correct: 0,
//         incorrect: 0
//       });
//     }
    
//     // อัพเดตข้อมูล
//     if (isCorrect) {
//       progress.correct += 1;
//     } else {
//       progress.incorrect += 1;
//     }
//     progress.lastSeen = new Date();
    
//     await progress.save();
    
//     // อัพเดตสถิติของคำศัพท์ด้วย
//     const word = await Word.findById(wordId);
//     if (isCorrect) {
//       word.correctAnswers += 1;
//     }
//     await word.save();
    
//     return NextResponse.json({
//       userId: progress.userId,
//       wordId: progress.wordId,
//       correct: progress.correct,
//       incorrect: progress.incorrect,
//       lastSeen: progress.lastSeen
//     });
//   } catch (error) {
//     console.error('Error updating progress:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }