'use client'

import { useEffect, useState } from 'react'
import { getCollection, orderBy } from '@/lib/firebase/firestore'

export function SuccessPage() {
  const [gallery, setGallery] = useState<any[]>([])

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const docs = await getCollection('gallery', orderBy('uploadedAt', 'desc'))
        setGallery(docs.filter((doc: any) => doc.role !== 'banners'))
      } catch (error) {
        console.error('Error loading gallery:', error)
      }
    }

    loadGallery()
  }, [])

  return (
    <div className="container">
      <h2 className="text-center mb-5">Our Success Stories</h2>
      <div className="row">
        <div className="col-12">
          <h3 className="mb-4">Awards & Achievements</h3>
          <div className="row g-4">
            {gallery.map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card shadow-sm">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="card-img-top"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    {item.description && (
                      <p className="card-text">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

