'use client'

import { useState } from 'react'
import { addDocument } from '@/lib/firebase/firestore'
import { uploadFile } from '@/lib/firebase/storage'

interface UploadTabProps {
  userId: string
}

export function UploadTab({ userId }: UploadTabProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    batch: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      alert('Please select a file to upload')
      return
    }

    setUploading(true)

    try {
      const filePath = `uploads/${Date.now()}_${file.name}`
      const fileUrl = await uploadFile(filePath, file, setUploadProgress)

      await addDocument('uploads', {
        ...formData,
        fileUrl,
        fileName: file.name,
        fileType: file.type,
        size: file.size,
        uploadedBy: userId,
        uploadedAt: new Date(),
      })

      alert('File uploaded successfully!')
      setFormData({ title: '', description: '', subject: '', batch: '' })
      setFile(null)
      setUploadProgress(0)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to upload file. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Upload Study Material</h2>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
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
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Batch</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.batch}
                      onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">File</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required
                  />
                </div>

                {uploading && (
                  <div className="mb-3">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${uploadProgress}%` }}
                        aria-valuenow={uploadProgress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        {uploadProgress.toFixed(0)}%
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Upload Material'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

