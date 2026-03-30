import { useMemo } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import type { Student } from '../types';

interface ScheduleViewProps {
  student: Student;
  onBack: () => void;
}

export function ScheduleView({ student, onBack }: ScheduleViewProps) {
  
  const sortedSchedules = useMemo(() => {
    return [...student.schedules].sort((a, b) => {
      // Basic numeric extraction for sorting by period, assuming 'A', '1', '1A' formats
      const aVal = parseInt(a.period.replace(/[^0-9]/g, ''), 10) || 99;
      const bVal = parseInt(b.period.replace(/[^0-9]/g, ''), 10) || 99;
      if (aVal === bVal) {
        return a.period.localeCompare(b.period);
      }
      return aVal - bVal;
    });
  }, [student.schedules]);

  return (
    <div className="view">
      <div className="top-nav" style={{ marginBottom: '16px' }}>
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} /> Back to Search
        </button>
      </div>

      <div className="profile-card">
        <div className="avatar profile-avatar">
          {(student.firstName?.[0] || '')}{(student.lastName?.[0] || '')}
        </div>
        <div className="profile-name">{student.firstName} {student.lastName}</div>
      </div>

      <h3 className="section-title">Current Schedule</h3>
      
      <div className="schedule-list">
        {sortedSchedules.length === 0 ? (
          <div className="empty-state">
            <Clock size={48} />
            <p>No schedule records found for this student.</p>
          </div>
        ) : (
          sortedSchedules.map((sched, idx) => (
            <div key={idx} className="schedule-card">
              <div className="period-badge">
                {sched.period}
              </div>
              <div className="class-details" style={{ flex: 1 }}>
                <h4>{sched.courseName}</h4>
                <p>
                  {sched.roomName} 
                  {sched.lunchName ? ` • Lunch: ${sched.lunchName}` : ''}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
