// User Types
export type UserRole = 'admin' | 'student' | 'teacher'

export interface User {
  id: string
  email: string
  displayName: string
  role: UserRole
  photoURL?: string
  phoneNumber?: string
  createdAt: Date
  updatedAt: Date
}

export interface Student extends User {
  role: 'student'
  batch?: string
  rollNumber?: string
  admissionDate?: Date
  feeStatus?: 'paid' | 'pending' | 'overdue'
}

export interface Teacher extends User {
  role: 'teacher'
  subject?: string
  qualification?: string
  joiningDate?: Date
}

export interface Admin extends User {
  role: 'admin'
  permissions?: string[]
}

// Academic Types
export interface Batch {
  id: string
  name: string
  startDate: Date
  endDate?: Date
  students: string[]
  teacher?: string
  schedule?: string
  active: boolean
}

export interface Test {
  id: string
  title: string
  description?: string
  batch: string
  date: Date
  duration: number
  totalMarks: number
  createdBy: string
  questions?: Question[]
}

export interface Question {
  id: string
  question: string
  options?: string[]
  correctAnswer?: string
  marks: number
}

export interface TestResult {
  id: string
  testId: string
  studentId: string
  marksObtained: number
  totalMarks: number
  submittedAt: Date
  answers?: Record<string, string>
}

// Content Types
export interface Notice {
  id: string
  title: string
  content: string
  date: Date
  priority: 'low' | 'medium' | 'high'
  createdBy: string
  attachments?: string[]
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  order?: number
}

export interface Feedback {
  id: string
  studentId: string
  message: string
  rating?: number
  date: Date
  status: 'pending' | 'reviewed' | 'resolved'
}

export interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  message: string
  date: Date
  status: 'new' | 'contacted' | 'enrolled' | 'rejected'
}

export interface Gallery {
  id: string
  title: string
  imageUrl: string
  description?: string
  uploadedAt: Date
  category?: string
}

export interface Topper {
  id: string
  studentId: string
  name: string
  marks: number
  totalMarks: number
  percentage: number
  batch: string
  year: number
  imageUrl?: string
}

// Schedule Types
export interface TimeTableEntry {
  id: string
  day: string
  startTime: string
  endTime: string
  subject: string
  teacher?: string
  batch: string
  room?: string
}

// Upload Types
export interface Upload {
  id: string
  title: string
  description?: string
  fileUrl: string
  fileType: string
  fileName: string
  uploadedBy: string
  uploadedAt: Date
  batch?: string
  subject?: string
  size?: number
}

// Analytics Types
export interface Performance {
  studentId: string
  tests: TestResult[]
  averageScore: number
  attendanceRate: number
  lastUpdated: Date
}

