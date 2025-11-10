'use client'

import { useEffect, useState } from 'react'
import { getCollection, deleteDocument } from '@/lib/firebase/firestore'

export function StudentsTab() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      setLoading(true)
      const docs = await getCollection('students')
      setStudents(docs)
    } catch (error) {
      console.error('Error loading students:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return

    try {
      await deleteDocument('students', id)
      setStudents(students.filter(s => s.id !== id))
    } catch (error) {
      console.error('Error deleting student:', error)
      alert('Failed to delete student')
    }
  }

  if (loading) {
    return <div className="container py-5 text-center">Loading...</div>
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Students Management</h2>
        <button className="btn btn-primary">Add New Student</button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Batch</th>
                  <th>Roll Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name || student.displayName}</td>
                    <td>{student.email}</td>
                    <td>{student.batch || 'N/A'}</td>
                    <td>{student.rollNumber || 'N/A'}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

