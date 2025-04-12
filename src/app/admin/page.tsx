// src/app/admin/page.tsx
"use client";
import { useState } from 'react';
import styles from './Admin.module.css';

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setMessage('กรุณาเลือกไฟล์');
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        if (typeof event.target?.result === 'string') {
          let data;
          
          if (file.name.endsWith('.csv')) {
            // แปลง CSV เป็น JSON
            data = parseCSV(event.target.result);
          } else if (file.name.endsWith('.json')) {
            // แปลง string เป็น JSON object
            data = JSON.parse(event.target.result);
          } else {
            setMessage('รองรับเฉพาะไฟล์ CSV หรือ JSON');
            return;
          }
          
          // ในที่นี้เราแค่แสดงผลลัพธ์ (ในการใช้งานจริงคุณจะบันทึกลงในฐานข้อมูล)
          console.log('Parsed data:', data);
          setMessage(`อัปโหลดสำเร็จ: พบคำศัพท์ ${countWords(data)} คำ`);
        }
      } catch (error) {
        console.error('Error parsing file:', error);
        setMessage('เกิดข้อผิดพลาดในการอ่านไฟล์');
      }
    };
    
    reader.readAsText(file);
  };
  
  // ฟังก์ชันแปลง CSV เป็น JSON
  const parseCSV = (csvText: string) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const result = {
      toeic: [] as any[],
      ielts: [] as any[],
      both: [] as any[]
    };
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',').map(v => v.trim());
      const obj: any = {};
      
      headers.forEach((header, index) => {
        obj[header] = values[index];
      });
      
      // กำหนดประเภทตามคอลัมน์ examType
      if (obj.examType === 'toeic') {
        result.toeic.push(obj);
      } else if (obj.examType === 'ielts') {
        result.ielts.push(obj);
      } else if (obj.examType === 'both') {
        result.both.push(obj);
      }
    }
    
    return result;
  };
  
  const countWords = (data: any) => {
    let count = 0;
    if (data.toeic) count += data.toeic.length;
    if (data.ielts) count += data.ielts.length;
    if (data.both) count += data.both.length;
    return count;
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>อัปโหลดคำศัพท์</h1>
      
      <form onSubmit={handleUpload} className={styles.uploadForm}>
        <div className={styles.fileInput}>
          <input
            type="file"
            accept=".csv,.json"
            onChange={handleFileChange}
          />
        </div>
        
        <button type="submit" className={styles.uploadButton}>
          อัปโหลด
        </button>
      </form>
      
      {message && (
        <div className={styles.message}>
          {message}
        </div>
      )}
      
      <div className={styles.instructions}>
        <h2>คำแนะนำ</h2>
        <p>รูปแบบ CSV ควรมีโครงสร้างดังนี้:</p>
        <pre>
          id,word,definition,example,partOfSpeech,examType,difficulty
          t1,accommodate,รองรับ,The hotel can accommodate 500 guests,verb,toeic,3
          i1,albeit,แม้ว่า,The project was completed albeit late,conjunction,ielts,4
        </pre>
        
        <p>หรือรูปแบบ JSON:</p>
        <pre>
{`{
  "toeic": [
    {
      "id": "t1",
      "word": "accommodate",
      "definition": "รองรับ",
      "example": "The hotel can accommodate 500 guests",
      "partOfSpeech": "verb",
      "difficulty": 3
    }
  ],
  "ielts": [ ... ],
  "both": [ ... ]
}`}
        </pre>
      </div>
    </div>
  );
}