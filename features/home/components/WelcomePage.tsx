'use client'

import { useState, useEffect } from 'react'
import { HomePage } from './HomePage'
import { CoursesPage } from './CoursesPage'
import { SuccessPage } from './SuccessPage'
import { AboutPage } from './AboutPage'
import { ContactPage } from './ContactPage'
import { SiteLinks } from './SiteLinks'

export function WelcomePage() {
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    // Handle hash navigation
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
    <>
      <main role="main" className="tab-content mt-2 mb-4" style={{ minHeight: '85vh' }}>
        <div
          id="home"
          className={`tab-pane fade ${activeTab === 'home' ? 'show active' : ''}`}
          role="tabpanel"
        >
          {activeTab === 'home' && <HomePage />}
        </div>

        <div
          id="courses"
          className={`tab-pane fade pt-5 ${activeTab === 'courses' ? 'show active' : ''}`}
          role="tabpanel"
        >
          {activeTab === 'courses' && <CoursesPage />}
        </div>

        <div
          id="success"
          className={`tab-pane fade pt-3 ${activeTab === 'success' ? 'show active' : ''}`}
          role="tabpanel"
        >
          {activeTab === 'success' && <SuccessPage />}
        </div>

        <div
          id="about"
          className={`tab-pane fade pt-5 ${activeTab === 'about' ? 'show active' : ''}`}
          role="tabpanel"
        >
          {activeTab === 'about' && <AboutPage />}
        </div>

        <div
          id="contact"
          className={`tab-pane fade pt-5 ${activeTab === 'contact' ? 'show active' : ''}`}
          role="tabpanel"
        >
          {activeTab === 'contact' && <ContactPage />}
        </div>
      </main>
      <SiteLinks />

      <style jsx>{`
        #home :global(.col-lg-4),
        #toppers :global(.col-lg-12) {
          text-align: center;
        }
      `}</style>
    </>
  )
}

