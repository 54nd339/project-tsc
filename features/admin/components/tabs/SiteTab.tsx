'use client'

import { useState } from 'react'

export function SiteTab() {
  const [activeSection, setActiveSection] = useState('notices')

  const sections = [
    { id: 'notices', name: 'Notices' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'faqs', name: 'FAQs' },
    { id: 'batches', name: 'Batches' },
    { id: 'toppers', name: 'Toppers' },
    { id: 'timetable', name: 'Time Table' },
  ]

  return (
    <div className="container py-5">
      <h2 className="mb-4">Site Content Management</h2>

      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`list-group-item list-group-item-action ${
                  activeSection === section.id ? 'active' : ''
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>

        <div className="col-md-9">
          <div className="card">
            <div className="card-header">
              <h5>
                {sections.find(s => s.id === activeSection)?.name} Management
              </h5>
            </div>
            <div className="card-body">
              <button className="btn btn-primary mb-3">
                Add New {sections.find(s => s.id === activeSection)?.name}
              </button>
              
              <div className="alert alert-info">
                Content management interface for {activeSection} will be displayed here.
                <br />
                Features include:
                <ul className="mt-2 mb-0">
                  <li>View all {activeSection}</li>
                  <li>Add new items</li>
                  <li>Edit existing items</li>
                  <li>Delete items</li>
                  <li>Upload images (for gallery)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

