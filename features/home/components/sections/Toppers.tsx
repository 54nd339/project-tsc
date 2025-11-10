'use client'

import { useEffect, useState } from 'react'
import { getCollection, orderBy, limit } from '@/lib/firebase/firestore'

export function Toppers() {
  const [toppers, setToppers] = useState<any[]>([])

  useEffect(() => {
    const loadToppers = async () => {
      try {
        const docs = await getCollection('toppers', orderBy('percentage', 'desc'), limit(6))
        setToppers(docs)
      } catch (error) {
        console.error('Error loading toppers:', error)
      }
    }

    loadToppers()
  }, [])

  return (
    <section id="toppers" className="my-5">
      <div className="container">
        <h2 className="text-center mb-4">Our Toppers</h2>
        <div className="row g-4">
          {toppers.length > 0 ? (
            toppers.map((topper) => (
              <div key={topper.id} className="col-lg-2 col-md-4 col-sm-6">
                <div className="card h-100 shadow-sm text-center">
                  {topper.imageUrl && (
                    <img
                      src={topper.imageUrl}
                      alt={topper.name}
                      className="card-img-top"
                      style={{ height: '150px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h6 className="card-title">{topper.name}</h6>
                    <p className="card-text">
                      <strong>{topper.percentage}%</strong>
                      <br />
                      <small>{topper.batch}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Results coming soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

