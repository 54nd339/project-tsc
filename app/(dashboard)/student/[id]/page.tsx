import { StudentDashboard } from '@/features/student/components/StudentDashboard'

export default function StudentPage({ params }: { params: { id: string } }) {
  return <StudentDashboard userId={params.id} />
}

