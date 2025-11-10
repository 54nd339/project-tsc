'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string
    borderColor?: string
  }[]
  title?: string
}

export function BarChart({ labels, datasets, title }: BarChartProps) {
  const data = {
    labels,
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor:
        dataset.backgroundColor ||
        `rgba(${53 + index * 50}, ${162 + index * 30}, ${235 - index * 40}, 0.5)`,
      borderColor:
        dataset.borderColor || `rgb(${53 + index * 50}, ${162 + index * 30}, ${235 - index * 40})`,
      borderWidth: 1,
    })),
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: !!title,
        text: title || '',
      },
    },
  }

  return <Bar data={data} options={options} />
}

