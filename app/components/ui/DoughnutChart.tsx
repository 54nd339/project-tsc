'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DoughnutChartProps {
  labels: string[]
  data: number[]
  title?: string
  backgroundColor?: string[]
}

export function DoughnutChart({ labels, data, title, backgroundColor }: DoughnutChartProps) {
  const defaultColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
  ]

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColor || defaultColors,
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: !!title,
        text: title || '',
      },
    },
  }

  return <Doughnut data={chartData} options={options} />
}

