'use client'

import { useEffect, useState } from 'react'
import { getCollection, updateDocument } from '@/lib/firebase/firestore'

export function PendingTab() {
  const [pendingUsers, setPendingUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPendingUsers()
  }, [])

  const loadPendingUsers = async () => {
    try {
      setLoading(true)
      const docs = await getCollection('users')
      setPendingUsers(docs.filter((u: any) => u.status === 'pending'))
    } catch (error) {
      console.error('Error loading pending users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (user: any) => {
    try {
      await updateDocument('users', user.id, { status: 'approved' })
      setPendingUsers(pendingUsers.filter(u => u.id !== user.id))
      alert('User approved successfully')
    } catch (error) {
      console.error('Error approving user:', error)
      alert('Failed to approve user')
    }
  }

  const handleReject = async (id: string) => {
    if (!confirm('Are you sure you want to reject this user?')) return

    try {
      await updateDocument('users', id, { status: 'rejected' })
      setPendingUsers(pendingUsers.filter(u => u.id !== id))
    } catch (error) {
      console.error('Error rejecting user:', error)
      alert('Failed to reject user')
    }
  }

  if (loading) {
    return <div className="container py-5 text-center">Loading...</div>
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Pending User Approvals</h2>

      {pendingUsers.length === 0 ? (
        <div className="alert alert-info">No pending approvals at the moment.</div>
      ) : (
        <div className="row g-4">
          {pendingUsers.map((user) => (
            <div key={user.id} className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.name || user.email}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}<br />
                    <strong>Role:</strong> {user.role}<br />
                    <strong>Phone:</strong> {user.phone || 'N/A'}
                  </p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success"
                      onClick={() => handleApprove(user)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(user.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

