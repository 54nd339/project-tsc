'use client'

import { useState } from 'react'
import { addDocument } from '@/lib/firebase/firestore'

interface ExamTabProps {
  userId: string
}

export function ExamTab({ userId }: ExamTabProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    batch: '',
    date: '',
    duration: 60,
    totalMarks: 100,
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await addDocument('tests', {
        ...formData,
        date: new Date(formData.date),
        createdBy: userId,
        createdAt: new Date(),
      })

      alert('Test created successfully!')
      setFormData({
        title: '',
        description: '',
        batch: '',
        date: '',
        duration: 60,
        totalMarks: 100,
      })
    } catch (error) {
      console.error('Error creating test:', error)
      alert('Failed to create test. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Create Test</h2>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Test Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Batch</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.batch}
                      onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Duration (minutes)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Total Marks</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.totalMarks}
                      onChange={(e) => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={submitting}
                >
                  {submitting ? 'Creating...' : 'Create Test'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

