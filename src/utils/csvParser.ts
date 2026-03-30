import Papa from 'papaparse';
import type { Student } from '../types';

export function parseStudentCsvData(csvString: string): Student[] {
  const result = Papa.parse(csvString, {
    header: true,
    skipEmptyLines: true,
  });

  const studentMap = new Map<string, Student>();

  result.data.forEach((row: any) => {
    const lastName = row['Last Name']?.trim() || '';
    const firstName = row['First Name']?.trim() || '';
    
    if (!firstName && !lastName) {
      return;
    }

    const studentId = `${lastName.toLowerCase()}-${firstName.toLowerCase()}`;

    if (!studentMap.has(studentId)) {
      studentMap.set(studentId, {
        id: studentId,
        firstName: firstName,
        lastName: lastName,
        schedules: []
      });
    }

    const student = studentMap.get(studentId)!;
    
    if (row['Course Name']) {
      const periodStart = row['Period Start']?.trim() || '';
      const schedStart = row['Schedule Start']?.trim() || '';
      const combinedPeriod = `${periodStart}${schedStart}`;
      
      student.schedules.push({
        period: combinedPeriod || 'N/A',
        courseName: row['Course Name']?.trim() || 'Unknown Class',
        roomName: row['Room Name']?.trim() || 'TBD',
        termStart: row['Term Start']?.trim() || '',
        lunchName: row['Lunch Name']?.trim() || '',
      });
    }
  });

  return Array.from(studentMap.values());
}
