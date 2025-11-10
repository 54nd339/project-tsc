'use client'

import { useState, useEffect } from 'react'
import { HomeTab } from './tabs/HomeTab'
import { UploadTab } from './tabs/UploadTab'
import { ExamTab } from './tabs/ExamTab'

interface TeacherDashboardProps {
  userId: string
}

export function TeacherDashboard({ userId }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setActiveTab(hash)
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '')
      if (newHash) {
        setActiveTab(newHash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <main role="main" className="tab-content mt-2 mb-4" style={{ minHeight: '85vh' }}>
      <div
        id="home"
        className={`tab-pane fade ${activeTab === 'home' ? 'show active' : ''}`}
        role="tabpanel"
      >
        {activeTab === 'home' && <HomeTab userId={userId} />}
      </div>

      <div
        id="upload"
        className={`tab-pane fade ${activeTab === 'upload' ? 'show active' : ''}`}
        role="tabpanel"
      >
        {activeTab === 'upload' && <UploadTab userId={userId} />}
      </div>

      <div
        id="exam"
        className={`tab-pane fade ${activeTab === 'exam' ? 'show active' : ''}`}
        role="tabpanel"
      >
        {activeTab === 'exam' && <ExamTab userId={userId} />}
      </div>
    </main>
  )
}

