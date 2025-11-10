import { AdminDashboard } from '@/features/admin/components/AdminDashboard'

export default function AdminPage({ params }: { params: { id: string } }) {
  return <AdminDashboard userId={params.id} />
}

