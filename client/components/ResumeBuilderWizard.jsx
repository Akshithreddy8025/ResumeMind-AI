'use client'

import { useState } from 'react'
import OptimizedResumePreview from './OptimizedResumePreview'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const ResumeBuilderWizard = ({
  analysis,
  oldResumeText,
  targetRole,
  targetCompany,
  jobDescription
}) => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [optimizedResume, setOptimizedResume] = useState(null)

  const [formData, setFormData] = useState({
    selectedSkills: [],
    projects: [
      {
        name: '',
        techStack: '',
        problemSolved: '',
        userRole: '',
        features: '',
        datasetOrApi: '',
        deploymentLink: '',
        githubLink: '',
        impact: ''
      }
    ],
    achievements: '',
    education: {
      college: '',
      degree: '',
      branch: '',
      cgpa: '',
      graduationYear: '',
      coursework: ''
    },
    experience: [
      {
        company: '',
        role: '',
        duration: '',
        responsibilities: '',
        achievements: '',
        techUsed: ''
      }
    ],
    certifications: '',
    template: 'ATS Classic'
  })

  const missingSkills = analysis?.missingSkills || []

  const steps = [
    'Skills',
    'Projects',
    'Achievements',
    'Education',
    'Template'
  ]

  const getSelectedTemplateName = () => {
    return typeof formData.template === 'string'
      ? formData.template
      : formData.template?.name || 'ATS Classic'
  }

  const saveCreatedResume = (resumeData) => {
    const oldResumes = JSON.parse(
      localStorage.getItem('resumemind_created_resumes') || '[]'
    )

    const resumeTitle =
      resumeData?.name ||
      resumeData?.title ||
      `${targetRole || 'Improved'} Resume`

    const newResume = {
      id: `resume_${Date.now()}`,
      title: resumeTitle,
      targetRole: targetRole || 'Target Role',
      targetCompany: targetCompany || 'Target Company',
      template: getSelectedTemplateName(),
      createdAt: new Date().toISOString(),
      data: resumeData,
      analysisSummary: {
        atsScore: analysis?.atsScore || 0,
        companyMatch: analysis?.companyMatch || 0,
        projectStrength: analysis?.projectStrength || 0,
        hiringProbability: analysis?.hiringProbability || 'Low'
      }
    }

    const updatedResumes = [
      newResume,
      ...oldResumes
    ].slice(0, 20)

    localStorage.setItem(
      'resumemind_created_resumes',
      JSON.stringify(updatedResumes)
    )

    return newResume
  }

  const toggleSkill = (skill) => {
    setFormData((prev) => {
      const exists = prev.selectedSkills.includes(skill)

      return {
        ...prev,
        selectedSkills: exists
          ? prev.selectedSkills.filter((item) => item !== skill)
          : [...prev.selectedSkills, skill]
      }
    })
  }

  const updateProject = (index, field, value) => {
    const updatedProjects = [...formData.projects]
    updatedProjects[index][field] = value

    setFormData((prev) => ({
      ...prev,
      projects: updatedProjects
    }))
  }

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: '',
          techStack: '',
          problemSolved: '',
          userRole: '',
          features: '',
          datasetOrApi: '',
          deploymentLink: '',
          githubLink: '',
          impact: ''
        }
      ]
    }))
  }

  const updateEducation = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value
      }
    }))
  }

  const generateResume = async () => {
    try {
      setLoading(true)

      const userAnswers = {
        ...formData,
        projects: formData.projects.map((project) => ({
          ...project,
          techStack: project.techStack
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
        })),
        achievements: formData.achievements
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
        certifications: formData.certifications
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
        education: {
          ...formData.education,
          coursework: formData.education.coursework
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
        }
      }

      const response = await fetch(
        `${API_BASE_URL}/api/resume/generate-optimized`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            oldResumeText,
            analysis,
            userAnswers,
            targetRole,
            targetCompany,
            jobDescription
          })
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to generate optimized resume')
      }

      const savedResume = saveCreatedResume(result.data)

      setOptimizedResume({
        ...result.data,
        savedResumeId: savedResume.id
      })

      setStep(6)
    } catch (error) {
      console.error('Generate optimized resume error:', error)
      alert(error.message || 'Failed to generate optimized resume')
    } finally {
      setLoading(false)
    }
  }

  if (optimizedResume && step === 6) {
    return (
      <OptimizedResumePreview
        resume={optimizedResume}
        selectedTemplate={getSelectedTemplateName()}
        onBack={() => setStep(5)}
      />
    )
  }

  return (
    <div className="resume-builder">
      <div className="resume-builder-header">
        <p className="resume-builder-eyebrow">
          AI Resume Rebuilder
        </p>

        <h2>
          Create an Improved Resume
        </h2>

        <p>
          Answer a few questions and ResumeMind AI will generate a cleaner,
          ATS-friendly resume tailored to your target role.
        </p>
      </div>

      <div className="builder-progress">
        {steps.map((label, index) => {
          const stepNumber = index + 1

          return (
            <div
              key={label}
              className={`builder-step ${
                step === stepNumber ? 'active' : ''
              } ${step > stepNumber ? 'completed' : ''}`}
            >
              <span className="builder-step-number">
                {stepNumber}
              </span>

              <span>
                {label}
              </span>

              {stepNumber !== steps.length && (
                <span className="builder-step-line"></span>
              )}
            </div>
          )
        })}
      </div>

      <div className="builder-panel">
        {step === 1 && (
          <div>
            <h3>
              Confirm Missing Skills
            </h3>

            <p>
              Select only the skills you actually know or have used.
            </p>

            <div className="builder-chip-grid">
              {missingSkills.length > 0 ? (
                missingSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`builder-chip ${
                      formData.selectedSkills.includes(skill)
                        ? 'selected'
                        : ''
                    }`}
                  >
                    {skill}
                  </button>
                ))
              ) : (
                <p className="muted-text">
                  No missing skills found from analysis.
                </p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>
              Add Your Projects
            </h3>

            <p>
              Add your strongest projects with problem statement, tech stack,
              impact, GitHub link, and deployment link.
            </p>

            <div className="builder-project-list">
              {formData.projects.map((project, index) => (
                <div
                  key={index}
                  className="builder-project-card"
                >
                  <h4>
                    Project {index + 1}
                  </h4>

                  <div className="builder-form-grid">
                    <div className="builder-field">
                      <label>Project Name</label>
                      <input
                        placeholder="ResumeMind AI"
                        value={project.name}
                        onChange={(e) =>
                          updateProject(index, 'name', e.target.value)
                        }
                      />
                    </div>

                    <div className="builder-field">
                      <label>Tech Stack</label>
                      <input
                        placeholder="React, Node.js, MongoDB, Gemini API"
                        value={project.techStack}
                        onChange={(e) =>
                          updateProject(index, 'techStack', e.target.value)
                        }
                      />
                    </div>

                    <div className="builder-field">
                      <label>Problem Solved</label>
                      <input
                        placeholder="Helps students improve resumes for ATS"
                        value={project.problemSolved}
                        onChange={(e) =>
                          updateProject(index, 'problemSolved', e.target.value)
                        }
                      />
                    </div>

                    <div className="builder-field">
                      <label>Your Role</label>
                      <input
                        placeholder="Full Stack Developer"
                        value={project.userRole}
                        onChange={(e) =>
                          updateProject(index, 'userRole', e.target.value)
                        }
                      />
                    </div>

                    <div className="builder-field full">
                      <label>Key Features</label>
                      <textarea
                        placeholder="ATS score, skill gap detection, AI suggestions, resume builder..."
                        value={project.features}
                        onChange={(e) =>
                          updateProject(index, 'features', e.target.value)
                        }
                      />
                    </div>

                    <div className="builder-field">
                      <label>Dataset / API Used</label>
                      <input
                        placeholder="Gemini API, resume parser, PDF parser"
                        value={project.datasetOrApi}
                        onChange={(e) =>
                          updateProject(index, 'datasetOrApi', e.target.value)
                        }
                      />
                    </div>

                    <div className="builder-field">
                      <label>Impact / Result</label>
                      <input
                        placeholder="Improved resume score by 40%"
                        value={project.impact}
                        onChange={(e) =>
                          updateProject(index, 'impact', e.target.value)
                        }
                      />
                    </div>

                    <div className="builder-field">
                      <label>GitHub Link</label>
                      <input
                        placeholder="https://github.com/..."
                        value={project.githubLink}
                        onChange={(e) =>
                          updateProject(index, 'githubLink', e.target.value)
                        }
                      />
                    </div>

                    <div className="builder-field">
                      <label>Deployment Link</label>
                      <input
                        placeholder="https://..."
                        value={project.deploymentLink}
                        onChange={(e) =>
                          updateProject(index, 'deploymentLink', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addProject}
              className="builder-secondary-btn"
              style={{ marginTop: '18px' }}
            >
              + Add Another Project
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3>
              Add Achievements & Certifications
            </h3>

            <p>
              Add each achievement or certification on a new line.
            </p>

            <div className="builder-form-grid">
              <div className="builder-field full">
                <label>Achievements</label>
                <textarea
                  placeholder="Built 5+ full-stack projects&#10;Solved 150+ coding problems&#10;Participated in hackathons"
                  value={formData.achievements}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      achievements: e.target.value
                    }))
                  }
                />
              </div>

              <div className="builder-field full">
                <label>Certifications</label>
                <textarea
                  placeholder="Machine Learning Certification&#10;Python for Data Science&#10;Google Cloud Fundamentals"
                  value={formData.certifications}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      certifications: e.target.value
                    }))
                  }
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3>
              Education Details
            </h3>

            <p>
              Add your academic details for the education section.
            </p>

            <div className="builder-form-grid">
              <div className="builder-field">
                <label>College</label>
                <input
                  placeholder="Your college name"
                  value={formData.education.college}
                  onChange={(e) => updateEducation('college', e.target.value)}
                />
              </div>

              <div className="builder-field">
                <label>Degree</label>
                <input
                  placeholder="B.Tech / B.E / MCA / B.Sc"
                  value={formData.education.degree}
                  onChange={(e) => updateEducation('degree', e.target.value)}
                />
              </div>

              <div className="builder-field">
                <label>Branch</label>
                <input
                  placeholder="CSE / AIML / IT"
                  value={formData.education.branch}
                  onChange={(e) => updateEducation('branch', e.target.value)}
                />
              </div>

              <div className="builder-field">
                <label>CGPA</label>
                <input
                  placeholder="8.5"
                  value={formData.education.cgpa}
                  onChange={(e) => updateEducation('cgpa', e.target.value)}
                />
              </div>

              <div className="builder-field">
                <label>Graduation Year</label>
                <input
                  placeholder="2026"
                  value={formData.education.graduationYear}
                  onChange={(e) =>
                    updateEducation('graduationYear', e.target.value)
                  }
                />
              </div>

              <div className="builder-field">
                <label>Coursework</label>
                <input
                  placeholder="Machine Learning, DBMS, DSA"
                  value={formData.education.coursework}
                  onChange={(e) => updateEducation('coursework', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h3>
              Choose Template
            </h3>

            <p>
              Select the resume style you want ResumeMind AI to generate.
            </p>

            <div className="template-grid">
              {[
                'ATS Classic',
                'Modern Tech',
                'AI Engineer',
                'Fresher Student',
                'Minimal One Page'
              ].map((template) => (
                <button
                  key={template}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      template
                    }))
                  }
                  className={`template-card ${
                    formData.template === template ? 'selected' : ''
                  }`}
                >
                  <h4>
                    {template}
                  </h4>

                  <p>
                    Clean, readable, and ATS-friendly layout.
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="builder-actions">
        <button
          type="button"
          disabled={step === 1}
          onClick={() => setStep((prev) => Math.max(1, prev - 1))}
          className="builder-secondary-btn"
        >
          Back
        </button>

        <div className="builder-actions-right">
          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              className="builder-primary-btn"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={generateResume}
              disabled={loading}
              className="builder-primary-btn"
            >
              {loading ? 'Generating...' : 'Generate Improved Resume'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilderWizard