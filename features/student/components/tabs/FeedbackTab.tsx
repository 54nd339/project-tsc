'use client'

import { useState } from 'react'
import { addDocument } from '@/lib/firebase/firestore'

interface FeedbackTabProps {
  userId: string
}

export function FeedbackTab({ userId }: FeedbackTabProps) {
  const [formData, setFormData] = useState({
    message: '',
    rating: 5,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await addDocument('feedback', {
        studentId: userId,
        ...formData,
        date: new Date(),
        status: 'pending',
      })
      setSubmitted(true)
      setFormData({ message: '', rating: 5 })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Submit Feedback</h2>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              {submitted ? (
                <div className="alert alert-success">
                  Thank you for your feedback! We appreciate your input.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <select
                      className="form-select"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({ ...formData, rating: Number(e.target.value) })
                      }
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                      <option value={4}>⭐⭐⭐⭐ Very Good</option>
                      <option value={3}>⭐⭐⭐ Good</option>
                      <option value={2}>⭐⭐ Fair</option>
                      <option value={1}>⭐ Poor</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Your Feedback</label>
                    <textarea
                      className="form-control"
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share your thoughts, suggestions, or concerns..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

