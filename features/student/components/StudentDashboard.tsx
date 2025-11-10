'use client'

import { useState, useEffect } from 'react'
import { HomeTab } from './tabs/HomeTab'
import { DownloadTab } from './tabs/DownloadTab'
import { ExamTab } from './tabs/ExamTab'
import { FeedbackTab } from './tabs/FeedbackTab'

interface StudentDashboardProps {
  userId: string
}

export function StudentDashboard({ userId }: StudentDashboardProps) {
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
        id="download"
        className={`tab-pane fade ${activeTab === 'download' ? 'show active' : ''}`}
        role="tabpanel"
      >
        {activeTab === 'download' && <DownloadTab />}
      </div>

      <div
        id="exam"
        className={`tab-pane fade ${activeTab === 'exam' ? 'show active' : ''}`}
        role="tabpanel"
      >
        {activeTab === 'exam' && <ExamTab userId={userId} />}
      </div>

      <div
        id="feedback"
        className={`tab-pane fade ${activeTab === 'feedback' ? 'show active' : ''}`}
        role="tabpanel"
      >
        {activeTab === 'feedback' && <FeedbackTab userId={userId} />}
      </div>
    </main>
  )
}

