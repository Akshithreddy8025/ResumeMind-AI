'use client'

import { useState } from 'react'

import Navbar from '../../components/Navbar'
import ATSCard from '../../components/ATSCard'
import UploadBox from '../../components/UploadBox'
import SkillChart from '../../components/SkillChart'
import AuthGuard from '../../components/AuthGuard'
import ResumeBuilderWizard from '../../components/ResumeBuilderWizard'

export default function Dashboard() {
  const [result, setResult] = useState(null)
  const [showBuilder, setShowBuilder] = useState(false)

  const [analysisMeta, setAnalysisMeta] = useState({
    company: 'Google',
    role: 'AI/ML Engineer',
    jobDescription: ''
  })

  const handleSetResult = (data) => {
    setResult(data)
    setShowBuilder(false)
  }

  const safeList = (items) => {
    if (!Array.isArray(items)) return []
    return items
  }

  const limitList = (items, limit = 18) => {
    const list = safeList(items)

    return {
      visible: list.slice(0, limit),
      remaining: Math.max(list.length - limit, 0)
    }
  }

  const topSkills = [...safeList(result?.skills)]
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 12)

  const renderSkillPills = (
    items,
    className,
    emptyText,
    limit = 18
  ) => {
    const { visible, remaining } = limitList(items, limit)

    if (visible.length === 0) {
      return (
        <p className="muted-text">
          {emptyText}
        </p>
      )
    }

    return (
      <div className="skill-pill-wrapper">
        {
          visible.map((skill, index) => (
            <span
              className={`skill-pill ${className}`}
              key={index}
            >
              {typeof skill === 'string' ? skill : skill.name}
            </span>
          ))
        }

        {
          remaining > 0 ? (
            <span className="skill-pill more">
              +{remaining} more
            </span>
          ) : null
        }
      </div>
    )
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
      <ul>
        {
          list.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))
        }
      </ul>
    )
  }

  const renderImprovementPriority = (items) => {
    const list = safeList(items)

    if (list.length === 0) {
      return (
        <p className="muted-text">
          No improvement priority available.
        </p>
      )
    }

    return (
      <div className="priority-list">
        {
          list.map((item, index) => (
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
                {item.action || 'Improve this section based on the job description.'}
              </p>
            </div>
          ))
        }
      </div>
    )
  }

  return (
    <AuthGuard>
      <div className="page">
        <div className="glow one"></div>
        <div className="glow two"></div>

        <div className="container">
          <Navbar />

          <div className="dashboard-hero">
            <h1 className="dashboard-title">
              AI Resume Dashboard
            </h1>

            <p className="dashboard-subtitle">
              Analyze resumes with ATS scoring, company matching,
              hiring probability, skill gap detection, and AI-powered
              improvement suggestions.
            </p>
          </div>

          <div className="upload-section">
            <UploadBox
              setResult={handleSetResult}
              setAnalysisMeta={setAnalysisMeta}
            />
          </div>

          {
            result ? (
              <>
                <div className="grid dashboard-metrics">
                  <ATSCard
                    title="ATS Score"
                    value={`${result.atsScore ?? 0}%`}
                    subtitle="ATS keyword and formatting compatibility"
                  />

                  <ATSCard
                    title="Company Match"
                    value={`${result.companyMatch ?? 0}%`}
                    subtitle="Fit for selected company and role"
                  />

                  <ATSCard
                    title="Combined Score"
                    value={`${result.combinedScore ?? 0}%`}
                    subtitle="Weighted final resume score"
                  />

                  <ATSCard
                    title="Hiring Probability"
                    value={result.hiringProbability || 'Low'}
                    subtitle="Estimated selection possibility"
                  />

                  <ATSCard
                    title="Project Strength"
                    value={`${result.projectStrength ?? 0}%`}
                    subtitle="Project relevance and implementation depth"
                  />

                  <ATSCard
                    title="Overall Level"
                    value={result.overallLevel || 'Beginner'}
                    subtitle="Current resume readiness level"
                  />
                </div>

                <div className="results-wrapper">
                  {/* AI SUMMARY */}

                  <div className="card summary-card">
                    <h2>
                      AI Summary
                    </h2>

                    <p>
                      {result.summary || result.aiSummary || 'No summary available.'}
                    </p>
                  </div>

                  {/* AI SCORE EXPLANATION */}

                  <div className="card result-card">
                    <h2>
                      AI Score Explanation
                    </h2>

                    <p className="muted-text">
                      {
                        result.scoreExplanation ||
                        'No score explanation available.'
                      }
                    </p>
                  </div>

                  {/* ATS + COMPANY REASONS */}

                  <div className="grid reason-grid">
                    <div className="card result-card">
                      <h2>
                        ATS Reason
                      </h2>

                      <p className="muted-text">
                        {
                          result.atsReason ||
                          'No ATS reason available.'
                        }
                      </p>
                    </div>

                    <div className="card result-card">
                      <h2>
                        Company Match Reason
                      </h2>

                      <p className="muted-text">
                        {
                          result.companyMatchReason ||
                          'No company match reason available.'
                        }
                      </p>
                    </div>
                  </div>

                  {/* CHARTS */}

                  <div className="chart-section">
                    <SkillChart
                      title="Top Detected Skill Scores"
                      skills={topSkills}
                      xKey="name"
                    />
                  </div>

                  <div className="chart-section">
                    <SkillChart
                      title="Skill Category Strength"
                      skills={safeList(result.skillCategories)}
                      xKey="category"
                    />
                  </div>

                  {/* MATCHED + MISSING */}

                  <div className="grid">
                    <div className="card result-card">
                      <h2>
                        Matched Skills
                      </h2>

                      {renderSkillPills(
                        result.matchedSkills,
                        'success',
                        'No matched skills found.',
                        18
                      )}
                    </div>

                    <div className="card result-card">
                      <h2>
                        Missing Skills
                      </h2>

                      {renderSkillPills(
                        result.missingSkills,
                        'warning',
                        'No major missing skills detected.',
                        18
                      )}
                    </div>
                  </div>

                  {/* EXTRA + DETECTED */}

                  <div className="grid">
                    <div className="card result-card">
                      <h2>
                        Extra Resume Skills
                      </h2>

                      {renderSkillPills(
                        result.extraSkills,
                        'neutral',
                        'No extra skills detected.',
                        20
                      )}
                    </div>

                    <div className="card result-card">
                      <h2>
                        Detected Skills
                      </h2>

                      {renderSkillPills(
                        result.detectedSkills,
                        'neutral',
                        'No detected skills available.',
                        20
                      )}
                    </div>
                  </div>

                  {/* AI INSIGHTS */}

                  <div className="insight-grid">
                    <div className="card result-card">
                      <h2>
                        AI Suggestions
                      </h2>

                      {renderList(
                        result.suggestions || result.aiSuggestions,
                        'No suggestions available.'
                      )}
                    </div>

                    <div className="card result-card">
                      <h2>
                        Resume Strengths
                      </h2>

                      {renderList(
                        result.strengths,
                        'No strengths available.'
                      )}
                    </div>

                    <div className="card result-card">
                      <h2>
                        Weaknesses
                      </h2>

                      {renderList(
                        result.weaknesses,
                        'No weaknesses available.'
                      )}
                    </div>
                  </div>

                  {/* IMPROVEMENT PRIORITY */}

                  <div className="card result-card">
                    <h2>
                      Improvement Priority
                    </h2>

                    {renderImprovementPriority(result.improvementPriority)}
                  </div>

                  {/* RESUME BUILDER CTA */}

                  <div className="card result-card">
                    <h2>
                      Improve Your Resume
                    </h2>

                    <p className="muted-text">
                      ResumeMind AI found skill gaps, ATS issues, and improvement areas.
                      Create a cleaner ATS-friendly resume using confirmed skills,
                      projects, achievements, and education details.
                    </p>

                    {!showBuilder && (
                      <button
                        type="button"
                        className="button"
                        style={{ marginTop: '20px' }}
                        onClick={() => setShowBuilder(true)}
                      >
                        Create Improved Resume
                      </button>
                    )}

                    {showBuilder && (
                      <button
                        type="button"
                        className="button secondary-btn"
                        style={{ marginTop: '20px' }}
                        onClick={() => setShowBuilder(false)}
                      >
                        Hide Resume Builder
                      </button>
                    )}
                  </div>

                  {
                    showBuilder ? (
                      <ResumeBuilderWizard
                        analysis={result}
                        oldResumeText={result?.resumeText || ''}
                        targetRole={analysisMeta.role || ''}
                        targetCompany={analysisMeta.company || ''}
                        jobDescription={analysisMeta.jobDescription || ''}
                      />
                    ) : null
                  }
                </div>
              </>
            ) : null
          }
        </div>
      </div>
    </AuthGuard>
  )
}
