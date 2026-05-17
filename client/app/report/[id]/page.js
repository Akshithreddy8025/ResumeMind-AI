'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import Navbar from '../../../components/Navbar'
import AuthGuard from '../../../components/AuthGuard'

export default function ReportPage() {
  const params = useParams()
  const router = useRouter()

  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem('resumemind_analysis_history') || '[]'
    )

    const selectedAnalysis = history.find((item) => item.id === params.id)

    if (selectedAnalysis) {
      setAnalysis(selectedAnalysis)
    }
  }, [params.id])

  const result = analysis?.result || {}
  const meta = analysis?.meta || {}

  const safeList = (items) => {
    if (!Array.isArray(items)) return []
    return items
  }

  const getReadinessScore = useMemo(() => {
    if (!result) return 0

    const ats = Number(result.atsScore || 0)
    const company = Number(result.companyMatch || 0)
    const project = Number(result.projectStrength || 0)

    return Math.round((ats + company + project) / 3)
  }, [result])

  const getScoreLabel = (score) => {
    if (score >= 85) return 'Excellent'
    if (score >= 70) return 'Good'
    if (score >= 50) return 'Average'
    return 'Needs Work'
  }

  const formatDate = (dateValue) => {
    if (!dateValue) return 'Unknown date'

    return new Date(dateValue).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderList = (items, emptyText) => {
    const list = safeList(items)

    if (list.length === 0) {
      return (
        <p className="muted-text">
          {emptyText}
        </p>
      )
    }

    return (
      <ul className="clean-list">
        {
          list.map((item, index) => (
            <li key={index}>
              {typeof item === 'string' ? item : JSON.stringify(item)}
            </li>
          ))
        }
      </ul>
    )
  }

  const renderSkillPills = (items, className, emptyText) => {
    const list = safeList(items)

    if (list.length === 0) {
      return (
        <p className="muted-text">
          {emptyText}
        </p>
      )
    }

    return (
      <div className="skill-pill-wrapper">
        {
          list.slice(0, 24).map((skill, index) => (
            <span
              className={`skill-pill ${className}`}
              key={index}
            >
              {typeof skill === 'string' ? skill : skill.name}
            </span>
          ))
        }
      </div>
    )
  }

  const handleUseAsLatest = () => {
    if (!analysis) return

    localStorage.setItem(
      'resumemind_latest_analysis',
      JSON.stringify(analysis)
    )

    router.push('/dashboard')
  }

  if (!analysis) {
    return (
      <AuthGuard>
        <div className="page">
          <div className="container">
            <Navbar />

            <section className="empty-dashboard-section">
              <div className="card empty-state-card">
                <span>⚠️</span>

                <h2>
                  Report not found
                </h2>

                <p>
                  This report may have been deleted or does not exist in your history.
                </p>

                <Link href="/history" className="button">
                  Back to History
                </Link>
              </div>
            </section>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="page">
        <div className="glow one"></div>
        <div className="glow two"></div>
        <div className="glow three"></div>

        <div className="container">
          <Navbar />

          <section className="report-hero">
            <div>
              <span className="eyebrow">
                Professional Resume Report
              </span>

              <h1>
                {meta.role || 'Resume Analysis Report'}
              </h1>

              <p>
                Target company: {meta.company || 'Not selected'} • Generated on{' '}
                {formatDate(analysis.savedAt)}
              </p>

              <div className="hero-actions">
                <button
                  type="button"
                  className="button"
                  onClick={handleUseAsLatest}
                >
                  Use as Latest
                </button>

                <Link href="/history" className="button secondary-btn">
                  Back to History
                </Link>
              </div>
            </div>

            <div className="report-score-card">
              <div className="score-ring">
                <span>
                  {getReadinessScore}%
                </span>
              </div>

              <h3>
                {getScoreLabel(getReadinessScore)} Readiness
              </h3>

              <p>
                Overall resume readiness based on ATS, company match, and project strength.
              </p>
            </div>
          </section>

          <section className="report-metric-grid">
            <div className="card report-metric-card">
              <span>🎯</span>
              <h3>{result.atsScore ?? 0}%</h3>
              <p>ATS Score</p>
            </div>

            <div className="card report-metric-card">
              <span>🏢</span>
              <h3>{result.companyMatch ?? 0}%</h3>
              <p>Company Match</p>
            </div>

            <div className="card report-metric-card">
              <span>🧩</span>
              <h3>{result.combinedScore ?? 0}%</h3>
              <p>Combined Score</p>
            </div>

            <div className="card report-metric-card">
              <span>🚀</span>
              <h3>{result.projectStrength ?? 0}%</h3>
              <p>Project Strength</p>
            </div>
          </section>

          <section className="report-layout">
            <div className="report-main">
              <div className="card report-section-card">
                <h2>
                  AI Summary
                </h2>

                <p className="muted-text">
                  {
                    result.summary ||
                    result.aiSummary ||
                    'No AI summary available.'
                  }
                </p>
              </div>

              <div className="card report-section-card">
                <h2>
                  Score Explanation
                </h2>

                <p className="muted-text">
                  {
                    result.scoreExplanation ||
                    'No score explanation available.'
                  }
                </p>
              </div>

              <div className="card report-section-card">
                <h2>
                  AI Suggestions
                </h2>

                {renderList(
                  result.suggestions || result.aiSuggestions,
                  'No suggestions available.'
                )}
              </div>

              <div className="card report-section-card">
                <h2>
                  Improvement Priority
                </h2>

                {
                  safeList(result.improvementPriority).length > 0 ? (
                    <div className="priority-list">
                      {
                        safeList(result.improvementPriority).map((item, index) => (
                          <div
                            className="priority-item"
                            key={index}
                          >
                            <div className="priority-top">
                              <h3>
                                {item.area || 'Improvement Area'}
                              </h3>

                              <span className="priority-badge">
                                {item.priority || 'Medium'}
                              </span>
                            </div>

                            <p>
                              {item.action || 'Improve this section based on the target role.'}
                            </p>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <p className="muted-text">
                      No improvement priority available.
                    </p>
                  )
                }
              </div>
            </div>

            <aside className="report-sidebar">
              <div className="card report-section-card">
                <h2>
                  Matched Skills
                </h2>

                {renderSkillPills(
                  result.matchedSkills,
                  'success',
                  'No matched skills found.'
                )}
              </div>

              <div className="card report-section-card">
                <h2>
                  Missing Skills
                </h2>

                {renderSkillPills(
                  result.missingSkills,
                  'warning',
                  'No missing skills detected.'
                )}
              </div>

              <div className="card report-section-card">
                <h2>
                  Strengths
                </h2>

                {renderList(
                  result.strengths,
                  'No strengths available.'
                )}
              </div>

              <div className="card report-section-card">
                <h2>
                  Weaknesses
                </h2>

                {renderList(
                  result.weaknesses,
                  'No weaknesses available.'
                )}
              </div>
            </aside>
          </section>
        </div>
      </div>
    </AuthGuard>
  )
}