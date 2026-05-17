'use client'

import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import ProfileMenu from '../../components/ProfileMenu'
import AuthGuard from '../../components/AuthGuard'

export default function Resumes() {
  const [resumes, setResumes] = useState([])

  useEffect(() => {
    const savedResumes = JSON.parse(
      localStorage.getItem('resumemind_created_resumes') || '[]'
    )

    setResumes(savedResumes)
  }, [])

  const formatDate = (dateValue) => {
    if (!dateValue) return 'Unknown date'

    return new Date(dateValue).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <AuthGuard>
      <div className="page">
        <div className="glow one"></div>
        <div className="glow two"></div>

        <div className="container">
          <Navbar />
          <ProfileMenu />

          <section className="templates-section">
            <div className="section-heading left">
              <span className="eyebrow">
                Resume Workspace
              </span>

              <h1>
                Created Resumes
              </h1>

              <p>
                View and manage improved resumes generated from your resume analysis.
              </p>
            </div>

            {
              resumes.length > 0 ? (
                <div className="template-grid">
                  {
                    resumes.map((resume) => (
                      <div
                        className="card template-card"
                        key={resume.id}
                      >
                        <span className="template-tag">
                          {resume.targetRole || 'Resume'}
                        </span>

                        <h2>
                          {resume.title || 'Improved Resume'}
                        </h2>

                        <p>
                          Target Company: {resume.targetCompany || 'Not selected'}
                        </p>

                        <p>
                          Created: {formatDate(resume.createdAt)}
                        </p>

                        <button className="button">
                          View Resume
                        </button>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="card empty-state-card">
                  <span>📄</span>

                  <h2>
                    No created resumes yet
                  </h2>

                  <p>
                    Analyze your resume and use the Resume Builder to create improved resumes.
                  </p>
                </div>
              )
            }
          </section>
        </div>
      </div>
    </AuthGuard>
  )
}