'use client'

import { useEffect, useState } from 'react'
import { getCollection, orderBy, limit } from '@/lib/firebase/firestore'
import { formatDate } from '@/lib/utils/date'

export function Notices() {
  const [notices, setNotices] = useState<any[]>([])

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const docs = await getCollection('notices', orderBy('date', 'desc'), limit(5))
        setNotices(docs)
      } catch (error) {
        console.error('Error loading notices:', error)
      }
    }

    loadNotices()
  }, [])

  return (
    <div className="col-lg-4 mb-3">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">Notices</h5>
          <div className="list-group list-group-flush">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <div key={notice.id} className="list-group-item">
                  <h6 className="mb-1">{notice.title}</h6>
                  <p className="mb-1 small">{notice.content}</p>
                  <small className="text-muted">
                    {formatDate(notice.date.toDate(), 'PP')}
                  </small>
                </div>
              ))
            ) : (
              <p className="text-muted">No notices at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

