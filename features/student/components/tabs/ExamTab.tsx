'use client'

import { useEffect, useState } from 'react'
import { getCollection, where } from '@/lib/firebase/firestore'

interface ExamTabProps {
  userId: string
}

export function ExamTab({ userId }: ExamTabProps) {
  const [tests, setTests] = useState<any[]>([])
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    loadExams()
  }, [userId])

  const loadExams = async () => {
    try {
      const [allTests, studentResults] = await Promise.all([
        getCollection('tests'),
        getCollection('testResults', where('studentId', '==', userId)),
      ])
      setTests(allTests)
      setResults(studentResults)
    } catch (error) {
      console.error('Error loading exams:', error)
    }
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Examinations</h2>

      <div className="card mb-4">
        <div className="card-header">
          <h5>Test Results</h5>
        </div>
        <div className="card-body">
          {results.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Test</th>
                    <th>Date</th>
                    <th>Marks Obtained</th>
                    <th>Total Marks</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => {
                    const percentage = (result.marksObtained / result.totalMarks) * 100
                    return (
                      <tr key={result.id}>
                        <td>{result.testTitle || 'Test'}</td>
                        <td>{new Date(result.submittedAt).toLocaleDateString()}</td>
                        <td>{result.marksObtained}</td>
                        <td>{result.totalMarks}</td>
                        <td>
                          <span className={`badge bg-${percentage >= 75 ? 'success' : percentage >= 50 ? 'warning' : 'danger'}`}>
                            {percentage.toFixed(2)}%
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted">No test results available</p>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Available Tests</h5>
        </div>
        <div className="card-body">
          {tests.length > 0 ? (
            <div className="row g-3">
              {tests.map((test) => (
                <div key={test.id} className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-title">{test.title}</h6>
                      <p className="card-text small">{test.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small>
                          Duration: {test.duration} mins | Marks: {test.totalMarks}
                        </small>
                        <button className="btn btn-sm btn-primary">Start Test</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No tests available</p>
          )}
        </div>
      </div>
    </div>
  )
}

