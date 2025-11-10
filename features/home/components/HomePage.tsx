'use client'

import { useEffect, useState } from 'react'
import { getCollection, where } from '@/lib/firebase/firestore'
import { Carousel } from '@/components/ui/Carousel'
import { Vision } from './sections/Vision'
import { Batches } from './sections/Batches'
import { Toppers } from './sections/Toppers'
import { Enquiry } from './sections/Enquiry'
import { Notices } from './sections/Notices'
import { MapSection } from './sections/MapSection'

export function HomePage() {
  const [banners, setBanners] = useState<any[]>([])

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const docs = await getCollection('gallery', where('role', '==', 'banners'))
        setBanners(docs)
      } catch (error) {
        console.error('Error loading banners:', error)
      }
    }

    loadBanners()
  }, [])

  return (
    <>
      <div className="shadow mb-4">
        <Carousel title="Banners" items={banners} />
      </div>
      <div id="content" className="container-fluid">
        <Vision />
        <Batches />
        <Toppers />
        <div className="row m-md-3" id="extras">
          <Enquiry />
          <Notices />
          <MapSection />
        </div>
      </div>
    </>
  )
}

