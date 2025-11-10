'use client'

import { useEffect, useState } from 'react'
import { getDocument, getCollection, where } from '@/lib/firebase/firestore'
import { PerformanceChart } from '../PerformanceChart'

interface HomeTabProps {
  userId: string
}

export function HomeTab({ userId }: HomeTabProps) {
  const [studentData, setStudentData] = useState<any>(null)
  const [upcomingTests, setUpcomingTests] = useState<any[]>([])
  const [performance, setPerformance] = useState<any>(null)

  useEffect(() => {
    loadStudentData()
  }, [userId])

  const loadStudentData = async () => {
    try {
      const data = await getDocument('students', userId)
      setStudentData(data)

      if (data?.batch) {
        const tests = await getCollection('tests', where('batch', '==', data.batch))
        setUpcomingTests(tests.filter((t: any) => new Date(t.date) > new Date()))
      }
    } catch (error) {
      console.error('Error loading student data:', error)
    }
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Student Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Personal Information</h5>
            </div>
            <div className="card-body">
              {studentData ? (
                <>
                  <p><strong>Name:</strong> {studentData.name}</p>
                  <p><strong>Email:</strong> {studentData.email}</p>
                  <p><strong>Batch:</strong> {studentData.batch || 'Not assigned'}</p>
                  <p><strong>Roll Number:</strong> {studentData.rollNumber || 'N/A'}</p>
                  <p><strong>Fee Status:</strong> 
                    <span className={`badge ms-2 bg-${studentData.feeStatus === 'paid' ? 'success' : 'warning'}`}>
                      {studentData.feeStatus || 'pending'}
                    </span>
                  </p>
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
              <h5>Performance Overview</h5>
            </div>
            <div className="card-body">
              <div className="text-center">
                <h3 className="text-primary">75%</h3>
                <p>Average Score</p>
              </div>
              <hr />
              <div className="d-flex justify-content-around">
                <div className="text-center">
                  <h4>12</h4>
                  <small>Tests Taken</small>
                </div>
                <div className="text-center">
                  <h4>90%</h4>
                  <small>Attendance</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Performance Chart</h5>
            </div>
            <div className="card-body">
              {performance ? (
                <PerformanceChart testResults={performance} />
              ) : (
                <p className="text-muted">No performance data available</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Upcoming Tests</h5>
            </div>
            <div className="card-body">
              {upcomingTests.length > 0 ? (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Total Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingTests.map((test) => (
                        <tr key={test.id}>
                          <td>{test.title}</td>
                          <td>{new Date(test.date).toLocaleDateString()}</td>
                          <td>{test.duration} mins</td>
                          <td>{test.totalMarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">No upcoming tests</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

