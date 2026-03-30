export interface ScheduleEntry {
  period: string;
  courseName: string;
  roomName: string;
  termStart: string;
  lunchName?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  schedules: ScheduleEntry[];
}
