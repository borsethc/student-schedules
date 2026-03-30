import { useState, useMemo } from 'react';
import { Search as SearchIcon, Users, ChevronRight } from 'lucide-react';
import type { Student } from '../types';

interface SearchProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

export function Search({ students, onSelectStudent }: SearchProps) {
  const [query, setQuery] = useState('');

  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    // Only search if 3 or more characters are typed
    if (q.length < 3) {
      return [];
    }

    // Match First 3+ letters of First or Last name exactly starting at the beginning of the string
    return students.filter(student => {
      const fName = student.firstName.toLowerCase();
      const lName = student.lastName.toLowerCase();
      return fName.startsWith(q) || lName.startsWith(q);
    });
  }, [query, students]);

  return (
    <div className="view">
      <div className="search-container" style={{ position: 'relative', marginBottom: '24px' }}>
        <SearchIcon 
          size={20} 
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
        />
        <input 
          type="text" 
          placeholder="Search by first 3 letters of first or last name..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          style={{ paddingLeft: '48px', borderRadius: '999px', boxShadow: 'var(--shadow-sm)' }}
        />
        {query.length > 0 && query.length < 3 && (
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', paddingLeft: '16px' }}>
            Type at least 3 letters to search...
          </p>
        )}
      </div>

      <div className="student-list">
        {query.length >= 3 && filteredStudents.length === 0 ? (
          <div className="empty-state">
            <Users size={48} />
            <p>No students found matching your search.</p>
          </div>
        ) : query.length < 3 ? (
          <div className="empty-state">
            <Users size={48} />
            <p>Type at least 3 letters of a student's first or last name to begin.</p>
          </div>
        ) : (
          filteredStudents.map(student => (
            <div key={student.id} className="student-card" onClick={() => onSelectStudent(student)}>
              <div className="avatar">
                {(student.firstName?.[0] || '')}{(student.lastName?.[0] || '')}
              </div>
              <div className="student-info" style={{ flex: 1 }}>
                <h4>{`${student.lastName}, ${student.firstName}`}</h4>
              </div>
              <ChevronRight size={20} color="var(--text-muted)" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
