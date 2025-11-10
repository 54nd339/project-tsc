'use client'

import { useEffect, useState } from 'react'
import { getCollection, where } from '@/lib/firebase/firestore'

export function Batches() {
  const [batches, setBatches] = useState<any[]>([])

  useEffect(() => {
    const loadBatches = async () => {
      try {
        const docs = await getCollection('batches', where('active', '==', true))
        setBatches(docs)
      } catch (error) {
        console.error('Error loading batches:', error)
      }
    }

    loadBatches()
  }, [])

  return (
    <section id="batches" className="my-5">
      <div className="container">
        <h2 className="text-center mb-4">Our Batches</h2>
        <div className="row g-4">
          {batches.length > 0 ? (
            batches.map((batch) => (
              <div key={batch.id} className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{batch.name}</h5>
                    <p className="card-text">
                      {batch.schedule && <><strong>Schedule:</strong> {batch.schedule}<br /></>}
                      {batch.students && <><strong>Students:</strong> {batch.students.length}</>}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No active batches at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

