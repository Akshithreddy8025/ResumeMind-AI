'use client'

import Navbar from '../../components/Navbar'
import AuthGuard from '../../components/AuthGuard'

export default function Templates() {
  const templates = [
    {
      name: 'AI Engineer Resume',
      description:
        'Modern ATS-friendly resume template for AI, ML, NLP, and computer vision roles.',
      tag: 'AI / ML'
    },
    {
      name: 'Full Stack Developer Resume',
      description:
        'Professional developer resume template for React, Node.js, APIs, and database projects.',
      tag: 'Developer'
    },
    {
      name: 'Data Scientist Resume',
      description:
        'Optimized for analytics, machine learning, visualization, and business intelligence roles.',
      tag: 'Data'
    },
    {
      name: 'Cloud Engineer Resume',
      description:
        'Perfect for AWS, DevOps, Docker, CI/CD, deployment, and cloud infrastructure profiles.',
      tag: 'Cloud'
    }
  ]

  return (
    <AuthGuard>
      <div className="page">
        <div className="glow one"></div>
        <div className="glow two"></div>

        <div className="container">
          <Navbar />

          <section className="templates-section">
            <div className="section-heading left">
              <h1>
                Resume Templates
              </h1>

              <p>
                Choose professional ATS-friendly resume templates for different career paths.
              </p>
            </div>

            <div className="template-grid">
              {
                templates.map((item, index) => (
                  <div
                    className="card template-card"
                    key={index}
                  >
                    <span className="template-tag">
                      {item.tag}
                    </span>

                    <h2>
                      {item.name}
                    </h2>

                    <p>
                      {item.description}
                    </p>

                    <button className="button">
                      Use Template
                    </button>
                  </div>
                ))
              }
            </div>
          </section>
        </div>
      </div>
    </AuthGuard>
  )
}