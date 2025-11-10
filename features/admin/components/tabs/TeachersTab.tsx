'use client'

import { useEffect, useState } from 'react'
import { getCollection, deleteDocument } from '@/lib/firebase/firestore'

export function TeachersTab() {
  const [teachers, setTeachers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTeachers()
  }, [])

  const loadTeachers = async () => {
    try {
      setLoading(true)
      const docs = await getCollection('teachers')
      setTeachers(docs)
    } catch (error) {
      console.error('Error loading teachers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return

    try {
      await deleteDocument('teachers', id)
      setTeachers(teachers.filter(t => t.id !== id))
    } catch (error) {
      console.error('Error deleting teacher:', error)
      alert('Failed to delete teacher')
    }
  }

  if (loading) {
    return <div className="container py-5 text-center">Loading...</div>
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Teachers Management</h2>
        <button className="btn btn-primary">Add New Teacher</button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Qualification</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.name || teacher.displayName}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.subject || 'N/A'}</td>
                    <td>{teacher.qualification || 'N/A'}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(teacher.id)}
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

