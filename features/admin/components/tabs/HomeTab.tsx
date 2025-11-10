'use client'

import { useEffect, useState } from 'react'
import { getCollection } from '@/lib/firebase/firestore'
import { StatsChart } from '../StatsChart'

interface HomeTabProps {
  userId: string
}

export function HomeTab({ userId }: HomeTabProps) {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    batches: 0,
    pendingUsers: 0,
  })

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [students, teachers, batches, pending] = await Promise.all([
          getCollection('students'),
          getCollection('teachers'),
          getCollection('batches'),
          getCollection('users').then(users => 
            users.filter((u: any) => u.status === 'pending')
          ),
        ])

        setStats({
          students: students.length,
          teachers: teachers.length,
          batches: batches.length,
          pendingUsers: pending.length,
        })
      } catch (error) {
        console.error('Error loading stats:', error)
      }
    }

    loadStats()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="card-body">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">{stats.students}</h3>
            <p className="text-gray-600">Total Students</p>
          </div>
        </div>

        <div className="card text-center">
          <div className="card-body">
            <h3 className="text-4xl font-bold text-green-600 mb-2">{stats.teachers}</h3>
            <p className="text-gray-600">Total Teachers</p>
          </div>
        </div>

        <div className="card text-center">
          <div className="card-body">
            <h3 className="text-4xl font-bold text-cyan-600 mb-2">{stats.batches}</h3>
            <p className="text-gray-600">Active Batches</p>
          </div>
        </div>

        <div className="card text-center">
          <div className="card-body">
            <h3 className="text-4xl font-bold text-yellow-600 mb-2">{stats.pendingUsers}</h3>
            <p className="text-gray-600">Pending Approvals</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h5 className="text-lg font-semibold">Platform Statistics</h5>
          </div>
          <div className="card-body">
            <StatsChart stats={{ ...stats, tests: 24 }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5 className="text-lg font-semibold">Quick Actions</h5>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              <a href="#students" className="btn btn-primary w-full">
                Manage Students
              </a>
              <a href="#teachers" className="btn btn-success w-full">
                Manage Teachers
              </a>
              <a href="#pending" className="btn btn-warning w-full">
                Review Pending Users
              </a>
              <a href="#site" className="btn btn-info w-full">
                Update Site Content
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

