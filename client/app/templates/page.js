'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import Navbar from '../../components/Navbar'
import ProfileMenu from '../../components/ProfileMenu'
import AuthGuard from '../../components/AuthGuard'

const resumeTemplates = [
  {
    id: 'ats-classic',
    name: 'ATS Classic',
    category: 'ATS Friendly',
    level: 'Fresher',
    bestFor: 'Freshers, internships, campus placements',
    score: 96,
    accent: 'Blue',
    description:
      'A clean single-column resume layout designed for ATS readability, simple formatting, and strong keyword visibility.',
    sections: [
      'Summary',
      'Education',
      'Skills',
      'Projects',
      'Internship',
      'Certifications'
    ],
    tags: [
      'ATS',
      'Fresher',
      'Simple',
      'PDF Friendly'
    ]
  },
  {
    id: 'ai-ml-engineer',
    name: 'AI/ML Engineer',
    category: 'AI / ML',
    level: 'Intermediate',
    bestFor: 'AI/ML roles, data science roles, research internships',
    score: 94,
    accent: 'Purple',
    description:
      'A technical resume template focused on ML projects, model metrics, datasets, Python skills, and deployment experience.',
    sections: [
      'AI Summary',
      'Technical Skills',
      'ML Projects',
      'Research / Papers',
      'Experience',
      'Certifications'
    ],
    tags: [
      'AI',
      'ML',
      'Python',
      'Projects'
    ]
  },
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    category: 'Software',
    level: 'Intermediate',
    bestFor: 'SDE, backend, frontend, full stack roles',
    score: 93,
    accent: 'Cyan',
    description:
      'A modern engineering template that highlights DSA, system design, full-stack projects, APIs, and scalable software work.',
    sections: [
      'Profile',
      'Skills',
      'Experience',
      'Projects',
      'Achievements',
      'Education'
    ],
    tags: [
      'SDE',
      'Full Stack',
      'Backend',
      'DSA'
    ]
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    category: 'Data',
    level: 'Fresher',
    bestFor: 'Data analyst, BI analyst, product analyst roles',
    score: 91,
    accent: 'Green',
    description:
      'A data-focused resume layout for SQL, Excel, Power BI, dashboards, business metrics, and analytics projects.',
    sections: [
      'Summary',
      'Analytics Skills',
      'Dashboard Projects',
      'Business Impact',
      'Education',
      'Certifications'
    ],
    tags: [
      'SQL',
      'Power BI',
      'Excel',
      'Analytics'
    ]
  },
  {
    id: 'cloud-devops',
    name: 'Cloud DevOps',
    category: 'Cloud / DevOps',
    level: 'Advanced',
    bestFor: 'Cloud engineer, DevOps engineer, SRE roles',
    score: 90,
    accent: 'Indigo',
    description:
      'A strong infrastructure resume template for cloud platforms, CI/CD, Docker, Kubernetes, Linux, monitoring, and automation.',
    sections: [
      'Cloud Profile',
      'Tools',
      'Infrastructure Projects',
      'Experience',
      'Certifications',
      'Education'
    ],
    tags: [
      'AWS',
      'Docker',
      'Kubernetes',
      'CI/CD'
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    category: 'Security',
    level: 'Intermediate',
    bestFor: 'Security analyst, SOC analyst, cloud security roles',
    score: 89,
    accent: 'Red',
    description:
      'A security-focused template for networking, Linux, SIEM tools, incident response, risk analysis, and security projects.',
    sections: [
      'Security Summary',
      'Security Skills',
      'Labs / Projects',
      'Tools',
      'Certifications',
      'Education'
    ],
    tags: [
      'SOC',
      'SIEM',
      'Linux',
      'Networking'
    ]
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    category: 'Product',
    level: 'Advanced',
    bestFor: 'APM, product manager, product analyst roles',
    score: 88,
    accent: 'Orange',
    description:
      'A business + tech resume layout for product strategy, user research, metrics, roadmaps, experiments, and stakeholder work.',
    sections: [
      'Product Summary',
      'Core Skills',
      'Product Work',
      'Metrics',
      'Experience',
      'Education'
    ],
    tags: [
      'Product',
      'Metrics',
      'Roadmap',
      'Strategy'
    ]
  },
  {
    id: 'consulting-business',
    name: 'Consulting Business',
    category: 'Business',
    level: 'Fresher',
    bestFor: 'Business analyst, consultant, risk analyst roles',
    score: 87,
    accent: 'Gold',
    description:
      'A professional template for consulting, business analysis, documentation, stakeholder communication, and problem solving.',
    sections: [
      'Professional Summary',
      'Business Skills',
      'Case Projects',
      'Experience',
      'Achievements',
      'Education'
    ],
    tags: [
      'Consulting',
      'BA',
      'Excel',
      'Communication'
    ]
  }
]

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [selectedTemplate, setSelectedTemplate] = useState(resumeTemplates[0])

  const normalize = (value) => String(value || '').toLowerCase().trim()

  const categories = useMemo(() => {
    return [
      'All',
      ...Array.from(new Set(resumeTemplates.map((template) => template.category)))
    ]
  }, [])

  const levels = [
    'All',
    'Fresher',
    'Intermediate',
    'Advanced'
  ]

  const filteredTemplates = useMemo(() => {
    const query = normalize(searchTerm)

    return resumeTemplates.filter((template) => {
      const matchesCategory =
        selectedCategory === 'All' || template.category === selectedCategory

      const matchesLevel =
        selectedLevel === 'All' || template.level === selectedLevel

      const searchableText = [
        template.name,
        template.category,
        template.level,
        template.bestFor,
        template.description,
        ...template.sections,
        ...template.tags
      ].join(' ')

      const matchesSearch = normalize(searchableText).includes(query)

      return matchesCategory && matchesLevel && matchesSearch
    })
  }, [searchTerm, selectedCategory, selectedLevel])

  const handleUseTemplate = (template) => {
    setSelectedTemplate(template)

    localStorage.setItem(
      'resumemind_selected_template',
      JSON.stringify({
        id: template.id,
        name: template.name,
        category: template.category,
        level: template.level,
        sections: template.sections,
        tags: template.tags,
        selectedAt: new Date().toISOString()
      })
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
          <ProfileMenu />

          <section className="templates-hero">
            <div>
              <span className="eyebrow">
                Resume Templates
              </span>

              <h1>
                Choose an ATS-ready resume template for your target role
              </h1>

              <p>
                Pick a professional template based on your career path. Each layout
                is designed for ATS readability, strong section structure, and
                role-specific keyword placement.
              </p>

              <div className="hero-actions">
                <Link href="/dashboard#analyzer" className="button">
                  Analyze Resume
                </Link>

                <Link href="/company-match" className="button secondary-btn">
                  Explore Companies
                </Link>
              </div>
            </div>

            <div className="template-preview-panel">
              <div className="mini-resume-preview">
                <div className="mini-resume-header">
                  <span></span>
                  <div>
                    <strong>{selectedTemplate.name}</strong>
                    <p>{selectedTemplate.category}</p>
                  </div>
                </div>

                <div className="mini-line wide"></div>
                <div className="mini-line"></div>
                <div className="mini-line short"></div>

                <div className="mini-section-grid">
                  {
                    selectedTemplate.sections.slice(0, 4).map((section) => (
                      <span key={section}>
                        {section}
                      </span>
                    ))
                  }
                </div>
              </div>

              <h2>
                {selectedTemplate.score}% ATS Structure
              </h2>

              <p>
                Selected: {selectedTemplate.name}
              </p>
            </div>
          </section>

          <section className="template-stats-grid">
            <div className="card template-stat-card">
              <span>📄</span>

              <h3>
                {resumeTemplates.length}
              </h3>

              <p>
                Templates
              </p>
            </div>

            <div className="card template-stat-card">
              <span>🎯</span>

              <h3>
                {categories.length - 1}
              </h3>

              <p>
                Career Tracks
              </p>
            </div>

            <div className="card template-stat-card">
              <span>⚡</span>

              <h3>
                ATS
              </h3>

              <p>
                Optimized Layouts
              </p>
            </div>
          </section>

          <section className="template-search-section">
            <div className="template-search-card">
              <div className="template-search-box">
                <label>
                  Search templates
                </label>

                <input
                  type="text"
                  placeholder="Search AI, SDE, Data, Cloud, Cybersecurity..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <div className="template-filter-row">
                <div>
                  <strong>
                    Category
                  </strong>

                  <div className="template-filter-pills">
                    {
                      categories.map((category) => (
                        <button
                          type="button"
                          key={category}
                          className={selectedCategory === category ? 'active' : ''}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </button>
                      ))
                    }
                  </div>
                </div>

                <div>
                  <strong>
                    Level
                  </strong>

                  <div className="template-filter-pills">
                    {
                      levels.map((level) => (
                        <button
                          type="button"
                          key={level}
                          className={selectedLevel === level ? 'active' : ''}
                          onClick={() => setSelectedLevel(level)}
                        >
                          {level}
                        </button>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="templates-layout">
            <div className="templates-grid">
              {
                filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template) => (
                    <article
                      className={`template-card ${
                        selectedTemplate.id === template.id ? 'active' : ''
                      }`}
                      key={template.id}
                    >
                      <div className="template-card-top">
                        <div>
                          <span className="template-tag">
                            {template.category}
                          </span>

                          <h2>
                            {template.name}
                          </h2>

                          <p>
                            {template.bestFor}
                          </p>
                        </div>

                        <div className="template-score">
                          <strong>
                            {template.score}%
                          </strong>

                          <span>
                            ATS
                          </span>
                        </div>
                      </div>

                      <p className="template-description">
                        {template.description}
                      </p>

                      <div className="template-sections">
                        {
                          template.sections.map((section) => (
                            <span key={section}>
                              {section}
                            </span>
                          ))
                        }
                      </div>

                      <div className="template-tags">
                        {
                          template.tags.map((tag) => (
                            <span key={tag}>
                              #{tag}
                            </span>
                          ))
                        }
                      </div>

                      <div className="template-card-actions">
                        <button
                          type="button"
                          className="button"
                          onClick={() => handleUseTemplate(template)}
                        >
                          Use Template
                        </button>

                        <button
                          type="button"
                          className="button secondary-btn"
                          onClick={() => setSelectedTemplate(template)}
                        >
                          Preview
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="card empty-state-card">
                    <span>🔍</span>

                    <h2>
                      No template found
                    </h2>

                    <p>
                      Try another category, level, or search keyword.
                    </p>
                  </div>
                )
              }
            </div>

            <aside className="template-detail-panel">
              <span className="template-tag">
                Live Preview
              </span>

              <h2>
                {selectedTemplate.name}
              </h2>

              <p>
                {selectedTemplate.description}
              </p>

              <div className="template-detail-score">
                <strong>
                  {selectedTemplate.score}%
                </strong>

                <span>
                  ATS Structure Score
                </span>
              </div>

              <div className="template-detail-block">
                <h3>
                  Best For
                </h3>

                <p>
                  {selectedTemplate.bestFor}
                </p>
              </div>

              <div className="template-detail-block">
                <h3>
                  Recommended Sections
                </h3>

                <div className="template-sections">
                  {
                    selectedTemplate.sections.map((section) => (
                      <span key={section}>
                        {section}
                      </span>
                    ))
                  }
                </div>
              </div>

              <div className="template-detail-block">
                <h3>
                  Keywords
                </h3>

                <div className="template-tags">
                  {
                    selectedTemplate.tags.map((tag) => (
                      <span key={tag}>
                        #{tag}
                      </span>
                    ))
                  }
                </div>
              </div>

              <Link
                href="/dashboard#analyzer"
                className="button template-detail-btn"
                onClick={() => handleUseTemplate(selectedTemplate)}
              >
                Use and Analyze Resume
              </Link>
            </aside>
          </section>
        </div>
      </div>
    </AuthGuard>
  )
}