'use client'

import { useEffect, useState } from 'react'
import { getCollection, orderBy } from '@/lib/firebase/firestore'

export function DownloadTab() {
  const [uploads, setUploads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUploads()
  }, [])

  const loadUploads = async () => {
    try {
      const docs = await getCollection('uploads', orderBy('uploadedAt', 'desc'))
      setUploads(docs)
    } catch (error) {
      console.error('Error loading uploads:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Study Materials</h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="row g-4">
          {uploads.map((upload) => (
            <div key={upload.id} className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{upload.title}</h5>
                  {upload.description && (
                    <p className="card-text">{upload.description}</p>
                  )}
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {upload.subject} • {new Date(upload.uploadedAt).toLocaleDateString()}
                    </small>
                    <a
                      href={upload.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Download
                    </a>
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

