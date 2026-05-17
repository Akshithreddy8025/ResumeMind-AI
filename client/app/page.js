'use client'

import Link from 'next/link'
import Navbar from '../components/Navbar'

const features = [
  {
    icon: '📊',
    title: 'ATS Resume Scoring',
    description:
      'Get a detailed ATS score based on formatting, keywords, structure, sections, readability, and recruiter-friendly resume signals.'
  },
  {
    icon: '🤖',
    title: 'AI Resume Suggestions',
    description:
      'Receive smart improvement suggestions for summary, skills, projects, experience, missing keywords, and role alignment.'
  },
  {
    icon: '🏢',
    title: 'Company Role Matching',
    description:
      'Explore companies and roles, compare required skills, check role fit, and understand what skills are missing for your target job.'
  },
  {
    icon: '🧠',
    title: 'Skill Gap Detection',
    description:
      'Identify missing technical and soft skills based on your target role, company category, and job description.'
  },
  {
    icon: '📝',
    title: 'Resume Builder',
    description:
      'Create an improved resume after analysis using structured sections, better wording, stronger project descriptions, and ATS-ready layout.'
  },
  {
    icon: '📄',
    title: 'ATS Templates',
    description:
      'Choose role-specific resume templates for AI/ML, software engineering, data analytics, cloud, cybersecurity, product, and consulting roles.'
  }
]

const steps = [
  {
    number: '01',
    title: 'Upload Resume',
    description:
      'Upload your PDF resume and optionally add target company, target role, and job description.'
  },
  {
    number: '02',
    title: 'Analyze with AI',
    description:
      'ResumeMind checks ATS score, keywords, skills, project strength, company fit, and improvement opportunities.'
  },
  {
    number: '03',
    title: 'Improve and Apply',
    description:
      'Use suggestions, templates, role roadmap, and resume builder to create a stronger job-ready resume.'
  }
]

const roles = [
  'AI/ML Engineer',
  'Software Engineer',
  'Data Analyst',
  'Cloud Engineer',
  'DevOps Engineer',
  'Cybersecurity Analyst',
  'Product Manager',
  'Business Analyst'
]

export default function Home() {
  return (
    <main className="page">
      <div className="glow one"></div>
      <div className="glow two"></div>
      <div className="glow three"></div>

      <div className="container">
        <Navbar />

        <section className="home-hero">
          <div className="home-hero-content">
            <span className="eyebrow">
              AI-Powered Resume Analyzer
            </span>

            <h1>
              Build a resume that beats ATS and matches your dream role
            </h1>

            <p>
              ResumeMind AI helps students and job seekers analyze resumes,
              improve ATS scores, detect missing skills, match companies,
              explore roles, and create stronger resumes for real job applications.
            </p>

            <div className="hero-actions">
              <Link href="/signup" className="button">
                Get Started Free
              </Link>

              <Link href="/login" className="button secondary-btn">
                Login
              </Link>
            </div>

            <div className="hero-trust-row">
              <span>ATS Score</span>
              <span>Skill Gap</span>
              <span>Company Match</span>
              <span>Resume Builder</span>
            </div>
          </div>

          <div className="home-hero-card">
            <div className="hero-score-card">
              <div className="score-ring">
                <span>92%</span>
              </div>

              <h3>
                Resume Health Score
              </h3>

              <p>
                Strong ATS structure with high keyword alignment and clear project impact.
              </p>

              <div className="hero-mini-bars">
                <div>
                  <span>ATS Formatting</span>
                  <strong>96%</strong>
                </div>

                <div>
                  <span>Keyword Match</span>
                  <strong>88%</strong>
                </div>

                <div>
                  <span>Project Strength</span>
                  <strong>91%</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-feature-strip">
          {
            roles.map((role) => (
              <span key={role}>
                {role}
              </span>
            ))
          }
        </section>

        <section className="section-block">
          <div className="section-heading">
            <span className="eyebrow">
              Features
            </span>

            <h2>
              Everything you need to improve your resume
            </h2>

            <p>
              From ATS scoring to company matching, ResumeMind AI gives you a
              complete resume improvement workflow.
            </p>
          </div>

          <div className="home-features-grid">
            {
              features.map((feature) => (
                <article className="card home-feature-card" key={feature.title}>
                  <span>
                    {feature.icon}
                  </span>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.description}
                  </p>
                </article>
              ))
            }
          </div>
        </section>

        <section className="home-product-section">
          <div className="home-product-card">
            <span className="eyebrow">
              Company Match
            </span>

            <h2>
              Explore companies, roles, required skills, and resume match
            </h2>

            <p>
              Search product companies, service MNCs, AI labs, fintech companies,
              SaaS companies, consulting firms, cloud companies, and cybersecurity
              companies. Compare roles and understand what skills you need next.
            </p>

            <Link href="/company-match" className="button">
              Explore Company Match
            </Link>
          </div>

          <div className="home-company-preview">
            <div className="company-preview-item active">
              <div>
                <h3>Google</h3>
                <p>AI/ML Engineer • Cloud Engineer • SDE</p>
              </div>
              <span>94%</span>
            </div>

            <div className="company-preview-item">
              <div>
                <h3>OpenAI</h3>
                <p>LLM Engineer • Applied AI Engineer</p>
              </div>
              <span>91%</span>
            </div>

            <div className="company-preview-item">
              <div>
                <h3>TCS</h3>
                <p>Java Developer • Data Analyst • Cloud Engineer</p>
              </div>
              <span>82%</span>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <span className="eyebrow">
              How it works
            </span>

            <h2>
              Improve your resume in 3 simple steps
            </h2>
          </div>

          <div className="home-steps-grid">
            {
              steps.map((step) => (
                <article className="home-step-card" key={step.number}>
                  <span>
                    {step.number}
                  </span>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>
                </article>
              ))
            }
          </div>
        </section>

        <section className="home-cta">
          <span className="eyebrow">
            Ready to improve?
          </span>

          <h2>
            Analyze your resume and create a stronger version today
          </h2>

          <p>
            Upload your resume, get instant insights, choose a template, match
            companies, and build a better resume for your next application.
          </p>

          <div className="hero-actions center">
            <Link href="/signup" className="button">
              Start Now
            </Link>

            <Link href="/templates" className="button secondary-btn">
              View Templates
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}