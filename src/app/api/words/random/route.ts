// // src/app/api/words/random/route.ts
// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
// import Word from '@/models/Words';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const examType = searchParams.get('examType');

//     await dbConnect();
    
//     // สร้างเงื่อนไขค้นหาตาม examType ถ้ามีการระบุ
//     const query = examType ? { examType: { $in: [examType] } } : {};
    
//     // นับจำนวนคำศัพท์ทั้งหมดที่ตรงตามเงื่อนไข
//     const count = await Word.countDocuments(query);
    
//     if (count === 0) {
//       return NextResponse.json({ error: 'No words found' }, { status: 404 });
//     }
    
//     // สุ่มคำศัพท์
//     const random = Math.floor(Math.random() * count);
//     const word = await Word.findOne(query).skip(random);
    
//     // อัพเดตจำนวนครั้งที่คำนี้ถูกแสดง
//     word.timesShown += 1;
//     await word.save();
    
//     return NextResponse.json({
//       id: word._id,
//       word: word.word,
//       definition: word.definition,
//       example: word.example,
//       partOfSpeech: word.partOfSpeech,
//       examType: word.examType,
//       difficulty: word.difficulty
//     });
//   } catch (error) {
//     console.error('Error fetching random word:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }