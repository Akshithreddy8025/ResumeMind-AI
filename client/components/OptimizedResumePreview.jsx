'use client'

const Section = ({ title, children }) => {
  return (
    <section className="resume-section">
      <h3 className="resume-section-title">
        {title}
      </h3>

      {children}
    </section>
  )
}

const getTemplateClass = (selectedTemplate) => {
  if (selectedTemplate === 'Modern Tech') {
    return 'resume-template-modern'
  }

  if (selectedTemplate === 'AI Engineer') {
    return 'resume-template-ai'
  }

  if (selectedTemplate === 'Fresher Student') {
    return 'resume-template-fresher'
  }

  if (selectedTemplate === 'Minimal One Page') {
    return 'resume-template-minimal'
  }

  return 'resume-template-classic'
}

const safeText = (value, fallback = '') => {
  if (value === null || value === undefined) return fallback

  if (typeof value === 'string') return value

  if (typeof value === 'number') return String(value)

  if (typeof value === 'object') {
    if (value.name) return String(value.name)
    if (value.title) return String(value.title)
    if (value.value) return String(value.value)

    return fallback
  }

  return fallback
}

const safeArray = (value) => {
  if (Array.isArray(value)) return value
  if (!value) return []
  return [value]
}

const formatSkillGroupName = (group) => {
  return group
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
}

const OptimizedResumePreview = ({
  resume,
  selectedTemplate = 'ATS Classic',
  onBack
}) => {
  if (!resume) return null

  const safeTemplate = safeText(
    selectedTemplate,
    'ATS Classic'
  )

  const skillGroups = resume.skills || {}
  const templateClass = getTemplateClass(safeTemplate)

  const handleDownloadPdf = () => {
    window.print()
  }

  return (
    <div className="optimized-preview-wrapper">
      <div className="resume-preview-actions no-print">
        <div>
          <p className="preview-label">
            Optimized Resume Preview
          </p>

          <h2>
            {safeText(resume.resumeTitle, 'Improved Resume')}
          </h2>

          <p className="preview-template-name">
            Selected Template: {safeTemplate}
          </p>
        </div>

        <div className="preview-button-group">
          <button
            type="button"
            onClick={onBack}
            className="preview-secondary-btn"
          >
            Back to Edit
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="preview-primary-btn"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div className="resume-download-area">
        <div className={`resume-paper resume-a4 ${templateClass}`}>
          <div className="resume-header">
            <h1>
              {safeText(resume.fullName, 'Your Name')}
            </h1>

            <p>
              {
                [
                  safeText(resume.email),
                  safeText(resume.phone),
                  safeText(resume.linkedin),
                  safeText(resume.github),
                  safeText(resume.portfolio)
                ]
                  .filter(Boolean)
                  .join(' • ') ||
                'Email • Phone • LinkedIn • GitHub • Portfolio'
              }
            </p>
          </div>

          <div className="resume-body">
            {
              resume.professionalSummary ? (
                <Section title="Professional Summary">
                  <p>
                    {safeText(resume.professionalSummary)}
                  </p>
                </Section>
              ) : null
            }

            <Section title="Technical Skills">
              <div className="resume-skills">
                {
                  Object.entries(skillGroups).map(([group, skills]) => {
                    const list = safeArray(skills)
                      .map((skill) => safeText(skill))
                      .filter(Boolean)

                    if (list.length === 0) return null

                    return (
                      <p key={group}>
                        <strong>
                          {formatSkillGroupName(group)}:
                        </strong>{' '}
                        {list.join(', ')}
                      </p>
                    )
                  })
                }
              </div>
            </Section>

            {
              safeArray(resume.projects).length > 0 ? (
                <Section title="Projects">
                  <div className="resume-list-block">
                    {
                      safeArray(resume.projects).map((project, index) => (
                        <div
                          className="resume-item"
                          key={index}
                        >
                          <h4>
                            {safeText(project.name, 'Project')}
                          </h4>

                          {
                            safeArray(project.techStack).length > 0 ? (
                              <p className="resume-muted">
                                Tech Stack:{' '}
                                {
                                  safeArray(project.techStack)
                                    .map((tech) => safeText(tech))
                                    .filter(Boolean)
                                    .join(', ')
                                }
                              </p>
                            ) : null
                          }

                          {
                            safeArray(project.bullets).length > 0 ? (
                              <ul>
                                {
                                  safeArray(project.bullets).map((bullet, bulletIndex) => (
                                    <li key={bulletIndex}>
                                      {safeText(bullet)}
                                    </li>
                                  ))
                                }
                              </ul>
                            ) : null
                          }
                        </div>
                      ))
                    }
                  </div>
                </Section>
              ) : null
            }

            {
              safeArray(resume.experience).length > 0 ? (
                <Section title="Experience">
                  <div className="resume-list-block">
                    {
                      safeArray(resume.experience).map((item, index) => (
                        <div
                          className="resume-item"
                          key={index}
                        >
                          <h4>
                            {
                              [
                                safeText(item.role),
                                safeText(item.company)
                              ]
                                .filter(Boolean)
                                .join(' - ') || 'Experience'
                            }
                          </h4>

                          {
                            item.duration ? (
                              <p className="resume-muted">
                                {safeText(item.duration)}
                              </p>
                            ) : null
                          }

                          {
                            safeArray(item.bullets).length > 0 ? (
                              <ul>
                                {
                                  safeArray(item.bullets).map((bullet, bulletIndex) => (
                                    <li key={bulletIndex}>
                                      {safeText(bullet)}
                                    </li>
                                  ))
                                }
                              </ul>
                            ) : null
                          }
                        </div>
                      ))
                    }
                  </div>
                </Section>
              ) : null
            }

            {
              safeArray(resume.education).length > 0 ? (
                <Section title="Education">
                  {
                    safeArray(resume.education).map((edu, index) => (
                      <div
                        className="resume-item"
                        key={index}
                      >
                        <h4>
                          {
                            [
                              safeText(edu.degree),
                              safeText(edu.branch)
                                ? `in ${safeText(edu.branch)}`
                                : ''
                            ]
                              .filter(Boolean)
                              .join(' ') || 'Education'
                          }
                        </h4>

                        {
                          edu.college ? (
                            <p>
                              {safeText(edu.college)}
                            </p>
                          ) : null
                        }

                        {
                          edu.cgpa || edu.graduationYear ? (
                            <p className="resume-muted">
                              {
                                [
                                  edu.cgpa ? `CGPA: ${safeText(edu.cgpa)}` : '',
                                  safeText(edu.graduationYear)
                                ]
                                  .filter(Boolean)
                                  .join(' • ')
                              }
                            </p>
                          ) : null
                        }

                        {
                          safeArray(edu.coursework).length > 0 ? (
                            <p>
                              <strong>Relevant Coursework:</strong>{' '}
                              {
                                safeArray(edu.coursework)
                                  .map((course) => safeText(course))
                                  .filter(Boolean)
                                  .join(', ')
                              }
                            </p>
                          ) : null
                        }
                      </div>
                    ))
                  }
                </Section>
              ) : null
            }

            {
              safeArray(resume.certifications).length > 0 ? (
                <Section title="Certifications">
                  <ul>
                    {
                      safeArray(resume.certifications).map((item, index) => (
                        <li key={index}>
                          {
                            typeof item === 'object'
                              ? [
                                  safeText(item.name),
                                  safeText(item.issuer),
                                  safeText(item.year)
                                ]
                                  .filter(Boolean)
                                  .join(' - ')
                              : safeText(item)
                          }
                        </li>
                      ))
                    }
                  </ul>
                </Section>
              ) : null
            }

            {
              safeArray(resume.achievements).length > 0 ? (
                <Section title="Achievements">
                  <ul>
                    {
                      safeArray(resume.achievements).map((item, index) => (
                        <li key={index}>
                          {safeText(item)}
                        </li>
                      ))
                    }
                  </ul>
                </Section>
              ) : null
            }
          </div>
        </div>
      </div>

      <div className="resume-extra-info no-print">
        <div className="resume-info-card">
          <h3>
            Template Recommendation
          </h3>

          <p>
            {
              safeText(
                resume.templateRecommendation,
                'Use a clean one-page ATS-friendly template.'
              )
            }
          </p>
        </div>

        {
          safeArray(resume.recommendedToLearn).length > 0 ? (
            <div className="resume-info-card warning">
              <h3>
                Recommended Skills to Learn
              </h3>

              <div className="learn-tags">
                {
                  safeArray(resume.recommendedToLearn).map((skill, index) => (
                    <span key={index}>
                      {safeText(skill)}
                    </span>
                  ))
                }
              </div>
            </div>
          ) : null
        }

        <div className="resume-info-card">
          <h3>
            Why this improves ATS
          </h3>

          <p>
            {
              safeText(
                resume.atsImprovementReason,
                'This resume improves ATS readability by using confirmed skills, relevant keywords, and concise project bullets.'
              )
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default OptimizedResumePreview