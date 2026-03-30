import { useState } from 'react';

import { Search } from './components/Search';
import { ScheduleView } from './components/ScheduleView';
import { Login } from './components/Login';
import type { Student } from './types';

// Native default CSV ingestion
import defaultCsvData from './assets/default-list.csv?raw';
import { parseStudentCsvData } from './utils/csvParser';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [students] = useState<Student[]>(() => parseStudentCsvData(defaultCsvData));
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleBackToSearch = () => {
    setSelectedStudent(null);
  };

  if (!isAuthenticated) {
    return <Login onUnlock={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <span style={{ fontSize: '24px' }}>🎓</span>
          <h1 id="header-title">Student Schedules</h1>
        </div>
      </header>

      <main className="app-content" style={{ paddingBottom: '0' }}>
        {!selectedStudent ? (
          <Search 
            students={students} 
            onSelectStudent={handleSelectStudent} 
          />
        ) : (
          <ScheduleView 
            student={selectedStudent} 
            onBack={handleBackToSearch} 
          />
        )}
      </main>

      <div style={{ position: 'fixed', bottom: 'env(safe-area-inset-bottom)', width: '100%', maxWidth: '480px', textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', zIndex: 5, padding: '10px 0', backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)' }}>
        v1.0 (Loaded: {students.length} students natively)
      </div>
    </div>
  );
}

export default App;
