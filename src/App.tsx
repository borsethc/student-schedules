import { useState } from 'react';
import { Settings, Search as SearchIcon } from 'lucide-react';
import { Upload } from './components/Upload';
import { Search } from './components/Search';
import { ScheduleView } from './components/ScheduleView';
import { Login } from './components/Login';
import type { Student } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [currentView, setCurrentView] = useState<'upload' | 'search'>('upload');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleDataLoaded = (newStudents: Student[]) => {
    setStudents(newStudents);
    setCurrentView('search');
    setSelectedStudent(null);
  };

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
          {/* We will just use an emoji or initial since we don't have the original logo */}
          <span style={{ fontSize: '24px' }}>🎓</span>
          <h1 id="header-title">Student Schedules</h1>
        </div>
        <button 
          className="settings-btn" 
          onClick={() => {
            setCurrentView('upload');
            setSelectedStudent(null);
          }}
          aria-label="Upload Data"
        >
          <Settings size={24} />
        </button>
      </header>

      <main className="app-content">
        {currentView === 'upload' && !selectedStudent && (
          <Upload onDataLoaded={handleDataLoaded} />
        )}

        {currentView === 'search' && !selectedStudent && (
          <Search 
            students={students} 
            onSelectStudent={handleSelectStudent} 
          />
        )}

        {selectedStudent && (
          <ScheduleView 
            student={selectedStudent} 
            onBack={handleBackToSearch} 
          />
        )}
      </main>

      {/* Basic Status Bar equivalent */}
      <div style={{ position: 'absolute', bottom: 'calc(75px + env(safe-area-inset-bottom))', width: '100%', textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', zIndex: 5, pointerEvents: 'none', opacity: 0.8 }}>
        v1.0 (Loaded: {students.length} students)
      </div>

      <nav className="bottom-nav" style={{ 
        position: 'absolute', bottom: 0, width: '100%', height: 'calc(70px + env(safe-area-inset-bottom))',
        backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(16px)', borderTop: '1px solid var(--border-color)',
        display: 'flex', justifyContent: 'space-around', paddingBottom: 'env(safe-area-inset-bottom)'
      }}>
        <button 
          className="nav-item" 
          style={{
            background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            width: '100%', color: (!selectedStudent && currentView === 'search') ? 'var(--primary)' : 'var(--text-muted)', gap: '4px'
          }}
          onClick={() => {
            setCurrentView('search');
            setSelectedStudent(null);
          }}
        >
          <SearchIcon size={24} />
          <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>Search</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
