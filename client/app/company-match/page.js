'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import Navbar from '../../components/Navbar'
import ProfileMenu from '../../components/ProfileMenu'
import AuthGuard from '../../components/AuthGuard'
import { companyRoles } from '../../data/companyRoles'

export default function CompanyMatch() {
  const [analysisData, setAnalysisData] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleSearchTerm, setRoleSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedRoleCategory, setSelectedRoleCategory] = useState('All')
  const [selectedCompany, setSelectedCompany] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('resumemind_latest_analysis')

    if (saved) {
      try {
        setAnalysisData(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to parse saved analysis:', error)
        setAnalysisData(null)
      }
    }
  }, [])

  const normalize = (value) => String(value || '').toLowerCase().trim()

  const companyTypes = useMemo(() => {
    const types = companyRoles.map((item) => item.type).filter(Boolean)
    return ['All', ...Array.from(new Set(types))]
  }, [])

  const roleCategories = [
    'All',
    'AI',
    'Web',
    'Data',
    'Cloud',
    'DevOps',
    'Security'
  ]

  const companyStats = useMemo(() => {
    const totalCompanies = companyRoles.length

    const totalRoles = companyRoles.reduce((sum, company) => {
      return sum + (company.roles?.length || 0)
    }, 0)

    return {
      totalCompanies,
      totalRoles,
      totalTypes: companyTypes.length - 1
    }
  }, [companyTypes])

  const getRoleCategory = (roleTitle) => {
    const role = normalize(roleTitle)

    if (
      role.includes('ai') ||
      role.includes('ml') ||
      role.includes('machine learning') ||
      role.includes('deep learning') ||
      role.includes('llm') ||
      role.includes('prompt') ||
      role.includes('computer vision') ||
      role.includes('nlp') ||
      role.includes('research engineer')
    ) {
      return 'AI'
    }

    if (
      role.includes('frontend') ||
      role.includes('full stack') ||
      role.includes('react') ||
      role.includes('web') ||
      role.includes('ui') ||
      role.includes('javascript') ||
      role.includes('typescript')
    ) {
      return 'Web'
    }

    if (
      role.includes('data') ||
      role.includes('analyst') ||
      role.includes('business intelligence') ||
      role.includes('etl') ||
      role.includes('analytics')
    ) {
      return 'Data'
    }

    if (
      role.includes('cloud') ||
      role.includes('aws') ||
      role.includes('azure') ||
      role.includes('gcp') ||
      role.includes('solutions architect')
    ) {
      return 'Cloud'
    }

    if (
      role.includes('devops') ||
      role.includes('sre') ||
      role.includes('site reliability') ||
      role.includes('platform') ||
      role.includes('kubernetes')
    ) {
      return 'DevOps'
    }

    if (
      role.includes('security') ||
      role.includes('cyber') ||
      role.includes('risk') ||
      role.includes('network')
    ) {
      return 'Security'
    }

    return 'Web'
  }

  const getRoleSkills = (roleTitle) => {
    const role = normalize(roleTitle)

    if (role.includes('prompt engineer')) {
      return [
        'Prompt Engineering',
        'LLM',
        'Generative AI',
        'Python',
        'APIs',
        'Evaluation',
        'Communication'
      ]
    }

    if (
      role.includes('llm') ||
      role.includes('ai') ||
      role.includes('machine learning') ||
      role.includes('ml') ||
      role.includes('research engineer') ||
      role.includes('applied ai')
    ) {
      return [
        'Python',
        'Machine Learning',
        'Deep Learning',
        'NLP',
        'LLM',
        'TensorFlow',
        'PyTorch',
        'Model Deployment',
        'MLOps'
      ]
    }

    if (role.includes('computer vision')) {
      return [
        'Python',
        'Computer Vision',
        'OpenCV',
        'Deep Learning',
        'PyTorch',
        'TensorFlow',
        'Image Processing',
        'Model Optimization'
      ]
    }

    if (role.includes('cuda') || role.includes('gpu')) {
      return [
        'CUDA',
        'C++',
        'GPU Computing',
        'Parallel Programming',
        'Linux',
        'Performance Optimization'
      ]
    }

    if (role.includes('embedded') || role.includes('hardware software')) {
      return [
        'C',
        'C++',
        'Embedded Systems',
        'Linux',
        'Microcontrollers',
        'Operating Systems',
        'Debugging'
      ]
    }

    if (role.includes('autonomous') || role.includes('robotics')) {
      return [
        'Python',
        'C++',
        'Computer Vision',
        'Robotics',
        'Deep Learning',
        'Sensors',
        'Control Systems'
      ]
    }

    if (role.includes('data scientist')) {
      return [
        'Python',
        'SQL',
        'Statistics',
        'Machine Learning',
        'Data Visualization',
        'Experimentation',
        'Analytics'
      ]
    }

    if (
      role.includes('data analyst') ||
      role.includes('business intelligence') ||
      role.includes('product analyst')
    ) {
      return [
        'SQL',
        'Excel',
        'Power BI',
        'Python',
        'Data Visualization',
        'Analytics',
        'Business Metrics'
      ]
    }

    if (role.includes('data engineer') || role.includes('etl')) {
      return [
        'SQL',
        'Python',
        'ETL',
        'Spark',
        'Data Warehousing',
        'Pipelines',
        'Cloud'
      ]
    }

    if (role.includes('frontend') || role.includes('ui')) {
      return [
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'TypeScript',
        'UI',
        'Performance'
      ]
    }

    if (role.includes('full stack')) {
      return [
        'React',
        'Node.js',
        'JavaScript',
        'REST API',
        'Databases',
        'Authentication',
        'Deployment'
      ]
    }

    if (
      role.includes('backend') ||
      role.includes('java developer') ||
      role.includes('python developer') ||
      role.includes('software engineer') ||
      role.includes('software developer') ||
      role.includes('software development engineer') ||
      role.includes('sde') ||
      role.includes('product engineer') ||
      role.includes('platform engineer') ||
      role.includes('product developer')
    ) {
      return [
        'DSA',
        'Java',
        'Python',
        'Node.js',
        'REST API',
        'Databases',
        'System Design'
      ]
    }

    if (
      role.includes('cloud') ||
      role.includes('aws') ||
      role.includes('azure') ||
      role.includes('solutions architect')
    ) {
      return [
        'AWS',
        'Azure',
        'GCP',
        'Docker',
        'Kubernetes',
        'Linux',
        'Networking'
      ]
    }

    if (
      role.includes('devops') ||
      role.includes('site reliability') ||
      role.includes('sre')
    ) {
      return [
        'Docker',
        'Kubernetes',
        'CI/CD',
        'Linux',
        'Cloud',
        'Monitoring',
        'Automation'
      ]
    }

    if (role.includes('cyber') || role.includes('security')) {
      return [
        'Networking',
        'Linux',
        'Security Tools',
        'SIEM',
        'Incident Response',
        'Risk Analysis'
      ]
    }

    if (
      role.includes('testing') ||
      role.includes('qa') ||
      role.includes('automation tester')
    ) {
      return [
        'Manual Testing',
        'Automation Testing',
        'Selenium',
        'API Testing',
        'Bug Tracking',
        'Test Cases'
      ]
    }

    if (role.includes('sap')) {
      return [
        'SAP',
        'ERP',
        'Business Process',
        'SQL',
        'Documentation',
        'Communication'
      ]
    }

    if (role.includes('quantitative') || role.includes('quant')) {
      return [
        'Python',
        'Statistics',
        'Mathematics',
        'SQL',
        'Finance',
        'Risk Modeling',
        'Data Analysis'
      ]
    }

    if (role.includes('risk')) {
      return [
        'Risk Analysis',
        'SQL',
        'Excel',
        'Finance',
        'Analytics',
        'Documentation',
        'Communication'
      ]
    }

    if (role.includes('salesforce')) {
      return [
        'Salesforce',
        'Apex',
        'SOQL',
        'JavaScript',
        'CRM',
        'APIs',
        'Cloud'
      ]
    }

    if (role.includes('database administrator')) {
      return [
        'SQL',
        'Database Administration',
        'Oracle',
        'Backup',
        'Performance Tuning',
        'Security'
      ]
    }

    if (
      role.includes('business analyst') ||
      role.includes('analyst') ||
      role.includes('consultant')
    ) {
      return [
        'SQL',
        'Excel',
        'Communication',
        'Business Analysis',
        'Documentation',
        'Problem Solving'
      ]
    }

    if (role.includes('product manager')) {
      return [
        'Product Strategy',
        'Roadmapping',
        'Analytics',
        'User Research',
        'Communication',
        'Prioritization'
      ]
    }

    if (role.includes('ios')) {
      return [
        'Swift',
        'iOS',
        'Mobile Development',
        'APIs',
        'UI',
        'App Performance'
      ]
    }

    if (role.includes('android') || role.includes('mobile')) {
      return [
        'Kotlin',
        'Java',
        'Android',
        'Mobile Development',
        'APIs',
        'UI'
      ]
    }

    if (role.includes('network')) {
      return [
        'Networking',
        'Linux',
        'TCP/IP',
        'Troubleshooting',
        'Cloud',
        'Security'
      ]
    }

    if (role.includes('support')) {
      return [
        'Troubleshooting',
        'Communication',
        'Linux',
        'SQL',
        'Cloud',
        'Customer Support'
      ]
    }

    return [
      'Problem Solving',
      'Communication',
      'Programming',
      'SQL',
      'Projects',
      'Teamwork'
    ]
  }

  const getCompanyFocusSkills = (company) => {
    const text = normalize(`${company.company} ${company.type} ${company.category}`)

    if (
      text.includes('ai') ||
      text.includes('openai') ||
      text.includes('nvidia') ||
      text.includes('tesla')
    ) {
      return [
        'python',
        'machine learning',
        'deep learning',
        'nlp',
        'computer vision',
        'pytorch',
        'tensorflow',
        'model deployment'
      ]
    }

    if (
      text.includes('fintech') ||
      text.includes('banking') ||
      text.includes('paypal') ||
      text.includes('visa')
    ) {
      return [
        'java',
        'python',
        'sql',
        'backend',
        'security',
        'risk analysis',
        'data engineering',
        'api'
      ]
    }

    if (
      text.includes('service') ||
      text.includes('consulting')
    ) {
      return [
        'java',
        'python',
        'sql',
        'communication',
        'cloud',
        'testing',
        'business analysis',
        'problem solving'
      ]
    }

    if (text.includes('saas')) {
      return [
        'javascript',
        'react',
        'backend',
        'api',
        'cloud',
        'databases',
        'product engineering',
        'testing'
      ]
    }

    if (
      text.includes('e-commerce') ||
      text.includes('foodtech')
    ) {
      return [
        'java',
        'backend',
        'system design',
        'databases',
        'data analytics',
        'machine learning',
        'api',
        'scalability'
      ]
    }

    return [
      'dsa',
      'java',
      'python',
      'system design',
      'databases',
      'cloud',
      'api',
      'problem solving'
    ]
  }

  const getResumeSkills = () => {
    if (!analysisData?.result) return []

    const result = analysisData.result

    const detectedSkills = Array.isArray(result.detectedSkills)
      ? result.detectedSkills
      : []

    const matchedSkills = Array.isArray(result.matchedSkills)
      ? result.matchedSkills
      : []

    const skillsFromObjects = Array.isArray(result.skills)
      ? result.skills.map((skill) => skill.name)
      : []

    return [
      ...detectedSkills,
      ...matchedSkills,
      ...skillsFromObjects
    ].map(normalize)
  }

  const calculateMatchPercent = (requiredSkills) => {
    if (!analysisData?.result || !requiredSkills.length) return 0

    const result = analysisData.result
    const resumeText = normalize(result.resumeText)
    const resumeSkills = getResumeSkills()

    const matched = requiredSkills.filter((skill) => {
      const normalizedSkill = normalize(skill)

      return (
        resumeSkills.includes(normalizedSkill) ||
        resumeText.includes(normalizedSkill)
      )
    })

    return Math.round((matched.length / requiredSkills.length) * 100)
  }

  const calculateCompanyScore = (company) => {
    if (!analysisData?.result) return 0

    const result = analysisData.result
    const focusSkills = getCompanyFocusSkills(company)
    const companySkillMatch = calculateMatchPercent(focusSkills)

    const atsScore = Number(result.atsScore || 0)
    const projectStrength = Number(result.projectStrength || 0)
    const baseCompanyMatch = Number(result.companyMatch || 0)

    return Math.round(
      companySkillMatch * 0.45 +
        baseCompanyMatch * 0.25 +
        atsScore * 0.20 +
        projectStrength * 0.10
    )
  }

  const calculateRoleScore = (roleTitle) => {
    return calculateMatchPercent(getRoleSkills(roleTitle))
  }

  const getMatchedRoleSkills = (roleTitle) => {
    if (!analysisData?.result) return []

    const result = analysisData.result
    const resumeText = normalize(result.resumeText)
    const resumeSkills = getResumeSkills()
    const roleSkills = getRoleSkills(roleTitle)

    return roleSkills.filter((skill) => {
      const normalizedSkill = normalize(skill)

      return (
        resumeSkills.includes(normalizedSkill) ||
        resumeText.includes(normalizedSkill)
      )
    })
  }

  const getMissingRoleSkills = (roleTitle) => {
    const roleSkills = getRoleSkills(roleTitle)

    if (!analysisData?.result) return roleSkills.slice(0, 5)

    const result = analysisData.result
    const resumeText = normalize(result.resumeText)
    const resumeSkills = getResumeSkills()

    return roleSkills.filter((skill) => {
      const normalizedSkill = normalize(skill)

      return (
        !resumeSkills.includes(normalizedSkill) &&
        !resumeText.includes(normalizedSkill)
      )
    })
  }

  const getMatchClass = (score) => {
    if (score >= 80) return 'high'
    if (score >= 65) return 'medium'
    return 'low'
  }

  const getLevelText = (score) => {
    if (score >= 85) return 'Excellent'
    if (score >= 75) return 'High'
    if (score >= 65) return 'Moderate'
    if (score > 0) return 'Needs Work'
    return 'Analyze First'
  }

  const filteredCompanies = useMemo(() => {
    const query = normalize(searchTerm)

    return companyRoles
      .filter((company) => {
        const matchesType =
          selectedType === 'All' || company.type === selectedType

        const searchableText = [
          company.company,
          company.type,
          company.category,
          company.location,
          ...(company.roles || []),
          ...getCompanyFocusSkills(company)
        ].join(' ')

        const matchesSearch = normalize(searchableText).includes(query)

        return matchesType && matchesSearch
      })
      .map((company) => ({
        ...company,
        score: calculateCompanyScore(company)
      }))
      .sort((a, b) => b.score - a.score)
  }, [searchTerm, selectedType, analysisData])

  useEffect(() => {
    if (!selectedCompany) return

    const stillExists = filteredCompanies.some((company) => {
      return company.company === selectedCompany.company
    })

    if (!stillExists) {
      setSelectedCompany(null)
    }
  }, [filteredCompanies, selectedCompany])

  const activeCompany = selectedCompany || filteredCompanies[0]

  const filteredRoles = useMemo(() => {
    if (!activeCompany?.roles) return []

    const query = normalize(roleSearchTerm)

    return activeCompany.roles.filter((roleTitle) => {
      const roleCategory = getRoleCategory(roleTitle)

      const matchesCategory =
        selectedRoleCategory === 'All' ||
        roleCategory === selectedRoleCategory

      const searchableText = [
        roleTitle,
        roleCategory,
        ...getRoleSkills(roleTitle)
      ].join(' ')

      const matchesSearch = normalize(searchableText).includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeCompany, roleSearchTerm, selectedRoleCategory])

  const handleSelectCompany = (company) => {
    setSelectedCompany(company)
    setRoleSearchTerm('')

    localStorage.setItem(
      'resumemind_selected_company',
      JSON.stringify({
        company: company.company,
        type: company.type,
        category: company.category,
        location: company.location,
        roles: company.roles,
        selectedAt: new Date().toISOString()
      })
    )
  }

  const handleAnalyzeRole = (company, roleTitle) => {
    localStorage.setItem(
      'resumemind_target_selection',
      JSON.stringify({
        company: company.company,
        role: roleTitle,
        roleCategory: getRoleCategory(roleTitle),
        roleSkills: getRoleSkills(roleTitle),
        companyFocusSkills: getCompanyFocusSkills(company),
        selectedAt: new Date().toISOString()
      })
    )

    localStorage.setItem(
      'resumemind_latest_meta',
      JSON.stringify({
        company: company.company,
        role: roleTitle,
        jobDescription: '',
        savedAt: new Date().toISOString()
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

          <section className="company-hero">
            <div>
              <span className="eyebrow">
                Company + Role Explorer
              </span>

              <h1>
                Search companies and explore available roles
              </h1>

              <p>
                Browse product companies, AI labs, service MNCs, consulting firms,
                fintech companies, SaaS companies, and startups. Select any company
                to view roles, required skills, resume match, and missing skills.
              </p>

              <div className="hero-actions">
                <Link href="/dashboard#analyzer" className="button">
                  Analyze Resume
                </Link>

                <Link href="/templates" className="button secondary-btn">
                  Browse Templates
                </Link>
              </div>
            </div>

            <div className="company-score-panel">
              <span>🔎</span>

              <h2>
                {analysisData ? 'Dynamic Matching Enabled' : 'Analyze Resume First'}
              </h2>

              <p>
                {
                  analysisData
                    ? 'Company and role scores are calculated from your latest resume analysis.'
                    : 'You can browse all companies now. Upload a resume to unlock dynamic scores.'
                }
              </p>
            </div>
          </section>

          <section className="company-stats-grid">
            <div className="card company-stat-card">
              <span>🏢</span>

              <h3>
                {companyStats.totalCompanies}+
              </h3>

              <p>
                Companies
              </p>
            </div>

            <div className="card company-stat-card">
              <span>💼</span>

              <h3>
                {companyStats.totalRoles}+
              </h3>

              <p>
                Available Roles
              </p>
            </div>

            <div className="card company-stat-card">
              <span>🧠</span>

              <h3>
                {companyStats.totalTypes}
              </h3>

              <p>
                Company Categories
              </p>
            </div>
          </section>

          <section className="company-search-section">
            <div className="company-search-card">
              <div className="company-search-box">
                <label>
                  Search company, role, or skill
                </label>

                <input
                  type="text"
                  placeholder="Search Google, AI Engineer, React, AWS, FinTech..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <div className="company-filter-pills">
                {
                  companyTypes.map((type) => (
                    <button
                      type="button"
                      key={type}
                      className={selectedType === type ? 'active' : ''}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </button>
                  ))
                }
              </div>
            </div>
          </section>

          <section className="company-explorer-layout">
            <div className="company-list-panel">
              <div className="section-heading left compact-heading">
                <h2>
                  Companies
                </h2>

                <p>
                  {filteredCompanies.length} companies found
                </p>
              </div>

              <div className="company-list">
                {
                  filteredCompanies.map((company) => (
                    <button
                      type="button"
                      key={company.company}
                      className={`company-list-item ${
                        activeCompany?.company === company.company ? 'active' : ''
                      }`}
                      onClick={() => handleSelectCompany(company)}
                    >
                      <div>
                        <h3>
                          {company.company}
                        </h3>

                        <p>
                          {company.type} • {company.category}
                        </p>
                      </div>

                      <span className={`company-badge ${getMatchClass(company.score)}`}>
                        {company.score > 0 ? `${company.score}%` : 'View'}
                      </span>
                    </button>
                  ))
                }
              </div>
            </div>

            <div className="company-role-panel">
              {
                activeCompany ? (
                  <>
                    <div className="company-detail-header">
                      <div>
                        <span className="template-tag">
                          {activeCompany.type}
                        </span>

                        <h2>
                          {activeCompany.company}
                        </h2>

                        <p>
                          {activeCompany.category} • {activeCompany.location}
                        </p>
                      </div>

                      <div className="company-main-score">
                        <h3>
                          {activeCompany.score > 0 ? `${activeCompany.score}%` : '--'}
                        </h3>

                        <span>
                          {getLevelText(activeCompany.score)} Match
                        </span>
                      </div>
                    </div>

                    <div className="company-focus-box">
                      <strong>
                        Company Focus Skills
                      </strong>

                      <p>
                        {getCompanyFocusSkills(activeCompany).join(', ')}
                      </p>
                    </div>

                    <div className="role-section-title">
                      <div>
                        <h3>
                          Available Roles
                        </h3>

                        <p>
                          Filter roles by category and choose one to prefill the analyzer.
                        </p>
                      </div>

                      <div className="role-search-box">
                        <input
                          type="text"
                          placeholder="Search role or skill..."
                          value={roleSearchTerm}
                          onChange={(event) => setRoleSearchTerm(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="company-filter-pills role-category-pills">
                      {
                        roleCategories.map((category) => (
                          <button
                            type="button"
                            key={category}
                            className={
                              selectedRoleCategory === category ? 'active' : ''
                            }
                            onClick={() => setSelectedRoleCategory(category)}
                          >
                            {category}
                          </button>
                        ))
                      }
                    </div>

                    {
                      filteredRoles.length > 0 ? (
                        <div className="role-grid">
                          {
                            filteredRoles.map((roleTitle) => {
                              const roleScore = calculateRoleScore(roleTitle)
                              const matchedSkills = getMatchedRoleSkills(roleTitle)
                              const missingSkills = getMissingRoleSkills(roleTitle)
                              const roleSkills = getRoleSkills(roleTitle)

                              return (
                                <div
                                  className="role-card"
                                  key={roleTitle}
                                >
                                  <div className="role-card-top">
                                    <div>
                                      <span className="template-tag">
                                        {getRoleCategory(roleTitle)}
                                      </span>

                                      <h3>
                                        {roleTitle}
                                      </h3>

                                      <p>
                                        Role-specific skill match
                                      </p>
                                    </div>

                                    <span className={`company-badge ${getMatchClass(roleScore)}`}>
                                      {roleScore > 0 ? `${roleScore}%` : 'Role'}
                                    </span>
                                  </div>

                                  <div className="template-sections">
                                    {
                                      roleSkills.map((skill) => (
                                        <span key={skill}>
                                          {skill}
                                        </span>
                                      ))
                                    }
                                  </div>

                                  <div className="company-focus-box role-skill-box">
                                    <strong>
                                      Matched Skills
                                    </strong>

                                    <p>
                                      {
                                        matchedSkills.length > 0
                                          ? matchedSkills.join(', ')
                                          : 'Analyze your resume to detect matched skills.'
                                      }
                                    </p>
                                  </div>

                                  <div className="company-focus-box role-skill-box">
                                    <strong>
                                      Missing Skills
                                    </strong>

                                    <p>
                                      {
                                        missingSkills.length > 0
                                          ? missingSkills.slice(0, 6).join(', ')
                                          : 'No major missing role skills found.'
                                      }
                                    </p>
                                  </div>

                                  <Link
                                    href="/dashboard#analyzer"
                                    className="button role-action-btn"
                                    onClick={() => handleAnalyzeRole(activeCompany, roleTitle)}
                                  >
                                    Analyze for this Role
                                  </Link>
                                </div>
                              )
                            })
                          }
                        </div>
                      ) : (
                        <div className="card empty-state-card">
                          <span>🔍</span>

                          <h2>
                            No role found
                          </h2>

                          <p>
                            Try another role category, company, or skill search.
                          </p>
                        </div>
                      )
                    }
                  </>
                ) : (
                  <div className="card empty-state-card">
                    <span>🔍</span>

                    <h2>
                      No company found
                    </h2>

                    <p>
                      Try searching another company, role, or skill.
                    </p>
                  </div>
                )
              }
            </div>
          </section>
        </div>
      </div>
    </AuthGuard>
  )
}