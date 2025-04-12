// // src/app/api/words/options/route.ts
// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import dbConnect from '@/lib/mongodb';
// import Word from '@/models/Words';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const wordId = searchParams.get('wordId');
//     const examType = searchParams.get('examType');

//     if (!wordId) {
//       return NextResponse.json({ error: 'Word ID is required' }, { status: 400 });
//     }

//     await dbConnect();
    
//     // หาคำศัพท์ที่ถูกต้อง
//     const correctWord = await Word.findById(wordId);
    
//     if (!correctWord) {
//       return NextResponse.json({ error: 'Word not found' }, { status: 404 });
//     }
    
//     // หาตัวเลือกที่ไม่ถูกต้อง 3 ตัวเลือก
//     const wrongOptions = await Word.aggregate([
//       { 
//         $match: { 
//           _id: { $ne: new mongoose.Types.ObjectId(wordId) },
//           ...(examType ? { examType: { $in: [examType] } } : {})
//         } 
//       },
//       { $sample: { size: 3 } },
//       { $project: { _id: 1, definition: 1 } }
//     ]);
    
//     // สร้างตัวเลือกทั้งหมดและสลับตำแหน่ง
//     const options = [
//       {
//         id: '1',
//         text: correctWord.definition,
//         isCorrect: true
//       },
//       ...wrongOptions.map((option, index) => ({
//         id: (index + 2).toString(),
//         text: option.definition,
//         isCorrect: false
//       }))
//     ].sort(() => Math.random() - 0.5);
    
//     return NextResponse.json({ options });
//   } catch (error) {
//     console.error('Error fetching options:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }