export type FaceStatus = 'registered' | 'pending' | 'not-registered'
export type AttendanceStatus = 'present' | 'absent' | 'late'
export type FacultyRole = 'admin' | 'faculty'

export interface Student {
  id: string
  name: string
  department: string
  year: string
  faceStatus: FaceStatus
  attendance: number
}

export interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  department: string
  date: string
  time: string
  status: AttendanceStatus
}

export interface FacultyUser {
  id: string
  name: string
  email: string
  password: string
  role: FacultyRole
  department: string
}

export const facultyUsers: FacultyUser[] = [
  {
    id: 'FAC-001',
    name: 'Dr. Ayutee',
    email: 'ayu@gmail.com',
    password: '5588',
    role: 'faculty',
    department: 'Computer Science',
  },
  {
    id: 'ADM-001',
    name: 'Admin User',
    email: 'admin@institution.edu',
    password: 'admin123',
    role: 'admin',
    department: 'Administration',
  },
]

export const students: Student[] = [
  { id: 'STU-1001', name: 'Aarav Sharma', department: 'Computer Science', year: '3rd Year', faceStatus: 'registered', attendance: 94 },
  { id: 'STU-1002', name: 'Priya Patel', department: 'Electronics', year: '2nd Year', faceStatus: 'registered', attendance: 88 },
  { id: 'STU-1003', name: 'Rohan Verma', department: 'Mechanical', year: '4th Year', faceStatus: 'pending', attendance: 76 },
  { id: 'STU-1004', name: 'Ananya Iyer', department: 'Computer Science', year: '1st Year', faceStatus: 'registered', attendance: 97 },
  { id: 'STU-1005', name: 'Karan Mehta', department: 'Civil', year: '3rd Year', faceStatus: 'not-registered', attendance: 62 },
  { id: 'STU-1006', name: 'Sneha Reddy', department: 'Electronics', year: '2nd Year', faceStatus: 'registered', attendance: 91 },
  { id: 'STU-1007', name: 'Vikram Singh', department: 'Computer Science', year: '4th Year', faceStatus: 'registered', attendance: 85 },
  { id: 'STU-1008', name: 'Isha Gupta', department: 'Mechanical', year: '1st Year', faceStatus: 'pending', attendance: 79 },
  { id: 'STU-1009', name: 'Aditya Nair', department: 'Civil', year: '2nd Year', faceStatus: 'registered', attendance: 90 },
  { id: 'STU-1010', name: 'Meera Joshi', department: 'Electronics', year: '3rd Year', faceStatus: 'registered', attendance: 96 },
  { id: 'STU-1011', name: 'Rahul Desai', department: 'Computer Science', year: '2nd Year', faceStatus: 'not-registered', attendance: 58 },
  { id: 'STU-1012', name: 'Kavya Menon', department: 'Mechanical', year: '4th Year', faceStatus: 'registered', attendance: 93 },
]

export const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil']
export const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export const recentActivity: AttendanceRecord[] = [
  { id: 'ATT-9001', studentId: 'STU-1004', studentName: 'Ananya Iyer', department: 'Computer Science', date: '2026-07-08', time: '09:02 AM', status: 'present' },
  { id: 'ATT-9002', studentId: 'STU-1001', studentName: 'Aarav Sharma', department: 'Computer Science', date: '2026-07-08', time: '09:05 AM', status: 'present' },
  { id: 'ATT-9003', studentId: 'STU-1003', studentName: 'Rohan Verma', department: 'Mechanical', date: '2026-07-08', time: '09:18 AM', status: 'late' },
  { id: 'ATT-9004', studentId: 'STU-1006', studentName: 'Sneha Reddy', department: 'Electronics', date: '2026-07-08', time: '09:07 AM', status: 'present' },
  { id: 'ATT-9005', studentId: 'STU-1005', studentName: 'Karan Mehta', department: 'Civil', date: '2026-07-08', time: '—', status: 'absent' },
  { id: 'ATT-9006', studentId: 'STU-1010', studentName: 'Meera Joshi', department: 'Electronics', date: '2026-07-08', time: '09:11 AM', status: 'present' },
  { id: 'ATT-9007', studentId: 'STU-1007', studentName: 'Vikram Singh', department: 'Computer Science', date: '2026-07-08', time: '09:24 AM', status: 'late' },
  { id: 'ATT-9008', studentId: 'STU-1009', studentName: 'Aditya Nair', department: 'Civil', date: '2026-07-08', time: '09:09 AM', status: 'present' },
]

export const reportRecords: AttendanceRecord[] = [
  ...recentActivity,
  { id: 'ATT-8901', studentId: 'STU-1002', studentName: 'Priya Patel', department: 'Electronics', date: '2026-07-07', time: '09:03 AM', status: 'present' },
  { id: 'ATT-8902', studentId: 'STU-1008', studentName: 'Isha Gupta', department: 'Mechanical', date: '2026-07-07', time: '09:31 AM', status: 'late' },
  { id: 'ATT-8903', studentId: 'STU-1011', studentName: 'Rahul Desai', department: 'Computer Science', date: '2026-07-07', time: '—', status: 'absent' },
  { id: 'ATT-8904', studentId: 'STU-1012', studentName: 'Kavya Menon', department: 'Mechanical', date: '2026-07-07', time: '09:00 AM', status: 'present' },
  { id: 'ATT-8905', studentId: 'STU-1001', studentName: 'Aarav Sharma', department: 'Computer Science', date: '2026-07-06', time: '09:06 AM', status: 'present' },
  { id: 'ATT-8906', studentId: 'STU-1005', studentName: 'Karan Mehta', department: 'Civil', date: '2026-07-06', time: '09:44 AM', status: 'late' },
]

export const recognizableStudents = [
  { id: 'STU-1001', name: 'Aarav Sharma', department: 'Computer Science', year: '3rd Year' },
  { id: 'STU-1004', name: 'Ananya Iyer', department: 'Computer Science', year: '1st Year' },
  { id: 'STU-1006', name: 'Sneha Reddy', department: 'Electronics', year: '2nd Year' },
  { id: 'STU-1010', name: 'Meera Joshi', department: 'Electronics', year: '3rd Year' },
  { id: 'STU-1009', name: 'Aditya Nair', department: 'Civil', year: '2nd Year' },
]

export const weeklyAttendance = [
  { day: 'Mon', present: 210, total: 248 },
  { day: 'Tue', present: 228, total: 248 },
  { day: 'Wed', present: 198, total: 248 },
  { day: 'Thu', present: 235, total: 248 },
  { day: 'Fri', present: 219, total: 248 },
  { day: 'Sat', present: 176, total: 248 },
]

export const dashboardStats = {
  totalStudents: 248,
  presentToday: 219,
  absentToday: 29,
  attendancePercentage: 88,
}

export const monthlySummary = [
  { label: 'Avg. Attendance', value: '88%', trend: '+3.2%' },
  { label: 'Classes Held', value: '124', trend: '+8' },
  { label: 'Perfect Attendance', value: '46', trend: '+5' },
  { label: 'Low Attendance', value: '12', trend: '-2' },
]