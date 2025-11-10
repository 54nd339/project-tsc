'use client'

import { useEffect, useState } from 'react'
import { getDocument } from '@/lib/firebase/firestore'

interface HomeTabProps {
  userId: string
}

export function HomeTab({ userId }: HomeTabProps) {
  const [teacherData, setTeacherData] = useState<any>(null)

  useEffect(() => {
    loadTeacherData()
  }, [userId])

  const loadTeacherData = async () => {
    try {
      const data = await getDocument('teachers', userId)
      setTeacherData(data)
    } catch (error) {
      console.error('Error loading teacher data:', error)
    }
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Teacher Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Personal Information</h5>
            </div>
            <div className="card-body">
              {teacherData ? (
                <>
                  <p><strong>Name:</strong> {teacherData.name}</p>
                  <p><strong>Email:</strong> {teacherData.email}</p>
                  <p><strong>Subject:</strong> {teacherData.subject || 'Not assigned'}</p>
                  <p><strong>Qualification:</strong> {teacherData.qualification || 'N/A'}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Quick Stats</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-around text-center">
                <div>
                  <h3 className="text-primary">8</h3>
                  <small>Classes Today</small>
                </div>
                <div>
                  <h3 className="text-success">45</h3>
                  <small>Total Students</small>
                </div>
                <div>
                  <h3 className="text-info">12</h3>
                  <small>Pending Tasks</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Today's Schedule</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Subject</th>
                      <th>Batch</th>
                      <th>Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>9:00 AM - 10:00 AM</td>
                      <td>Mathematics</td>
                      <td>Class X-A</td>
                      <td>Room 201</td>
                    </tr>
                    <tr>
                      <td>10:30 AM - 11:30 AM</td>
                      <td>Physics</td>
                      <td>Class XII-B</td>
                      <td>Lab 1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

