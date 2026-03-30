import { useState } from 'react';
import Papa from 'papaparse';
import { UploadCloud, FileText } from 'lucide-react';
import type { Student } from '../types';

interface UploadProps {
  onDataLoaded: (students: Student[]) => void;
}

export function Upload({ onDataLoaded }: UploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const studentMap = new Map<string, Student>();

          results.data.forEach((row: any) => {
            const lastName = row['Last Name']?.trim() || '';
            const firstName = row['First Name']?.trim() || '';
            
            if (!firstName && !lastName) {
              return; // Skip invalid rows
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
            
            // Avoid adding completely empty schedule periods
            if (row['Course Name']) {
              student.schedules.push({
                period: row['Period Start']?.trim() || 'N/A',
                courseName: row['Course Name']?.trim() || 'Unknown Class',
                roomName: row['Room Name']?.trim() || 'TBD',
                termStart: row['Term Start']?.trim() || '',
                lunchName: row['Lunch Name']?.trim() || '',
              });
            }
          });

          const studentsArray = Array.from(studentMap.values());
          onDataLoaded(studentsArray);
        } catch (err) {
          setError('Failed to process CSV file. Please check the format.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      error: (err) => {
        setError(`Error parsing file: ${err.message}`);
        setLoading(false);
      }
    });
  };

  return (
    <div className="view">
      <h2 className="section-title" style={{ textAlign: 'center', marginTop: '20px' }}>Data Management</h2>
      <div className="upload-card">
        <UploadCloud size={48} color="var(--primary)" style={{ margin: '0 auto 16px', opacity: 0.8 }} />
        <p style={{ marginBottom: '12px', color: 'var(--text-muted)' }}>
          Upload a CSV file containing the student roster and schedules.
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--primary)', background: 'var(--primary-light)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px' }}>
          <strong>Format expected:</strong> First Name, Last Name, Course Name, Schedule Start, Period Start, Room Name, Lunch Name
        </p>
        
        <div className="file-upload-wrapper">
          <input 
            type="file" 
            id="csv-upload" 
            accept=".csv" 
            className="file-input" 
            onChange={handleFileUpload}
            disabled={loading}
          />
          <label htmlFor="csv-upload" className="file-label" style={{ display: 'flex' }}>
            <FileText size={20} />
            <span>{loading ? 'Processing...' : 'Choose CSV File'}</span>
          </label>
        </div>
        {error && <div style={{ color: 'var(--danger)', marginTop: '12px', fontSize: '0.875rem' }}>{error}</div>}
      </div>
    </div>
  );
}
