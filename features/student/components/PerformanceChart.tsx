'use client'

import { LineChart } from '@/components/ui/LineChart'

interface PerformanceChartProps {
  testResults: {
    testName: string
    score: number
    totalMarks: number
  }[]
}

export function PerformanceChart({ testResults }: PerformanceChartProps) {
  const labels = testResults.map((r) => r.testName)
  const percentages = testResults.map((r) => (r.score / r.totalMarks) * 100)

  const datasets = [
    {
      label: 'Performance (%)',
      data: percentages,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
    },
  ]

  return (
    <div style={{ height: '300px' }}>
      <LineChart labels={labels} datasets={datasets} title="Your Performance Trend" />
    </div>
  )
}

