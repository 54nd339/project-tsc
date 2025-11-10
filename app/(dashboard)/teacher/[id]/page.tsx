import { TeacherDashboard } from '@/features/teacher/components/TeacherDashboard'

export default function TeacherPage({ params }: { params: { id: string } }) {
  return <TeacherDashboard userId={params.id} />
}

