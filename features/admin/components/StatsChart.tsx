'use client'

import { BarChart } from '@/components/ui/BarChart'

interface StatsChartProps {
  stats: {
    students: number
    teachers: number
    batches: number
    tests: number
  }
}

export function StatsChart({ stats }: StatsChartProps) {
  const labels = ['Students', 'Teachers', 'Batches', 'Tests']
  const data = [stats.students, stats.teachers, stats.batches, stats.tests]

  const datasets = [
    {
      label: 'Count',
      data,
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      borderColor: 'rgb(34, 197, 94)',
    },
  ]

  return (
    <div style={{ height: '300px' }}>
      <BarChart labels={labels} datasets={datasets} title="Platform Overview" />
    </div>
  )
}

