'use client'

import { useState, useEffect } from 'react'
import { StudentsTab } from './tabs/StudentsTab'
import { TeachersTab } from './tabs/TeachersTab'
import { PendingTab } from './tabs/PendingTab'
import { SiteTab } from './tabs/SiteTab'
import { HomeTab } from './tabs/HomeTab'

interface AdminDashboardProps {
  userId: string
}

export function AdminDashboard({ userId }: AdminDashboardProps) {
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
        id="students"
        className={`tab-pane fade ${activeTab === 'students' ? 'show active' : ''}`}
        role="tabpanel"
      >
        {activeTab === 'students' && <StudentsTab />}
      </div>

      <div
        id="teachers"
        className={`tab-pane fade ${activeTab === 'teachers' ? 'show active' : ''}`}
        role="tabpanel"
      >
        {activeTab === 'teachers' && <TeachersTab />}
      </div>

      <div
        id="pending"
        className={`tab-pane fade ${activeTab === 'pending' ? 'show active' : ''}`}
        role="tabpanel"
      >
        {activeTab === 'pending' && <PendingTab />}
      </div>

      <div
        id="site"
        className={`tab-pane fade ${activeTab === 'site' ? 'show active' : ''}`}
        role="tabpanel"
      >
        {activeTab === 'site' && <SiteTab />}
      </div>
    </main>
  )
}

