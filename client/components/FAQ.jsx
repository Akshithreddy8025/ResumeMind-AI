export default function FAQ() {
  const faqs = [
    {
      question: 'What is ResumeMind AI?',
      answer:
        'ResumeMind AI is an AI-powered resume analyzer that checks ATS score, company match, missing skills, hiring probability, and improvement suggestions.'
    },
    {
      question: 'Does it support job descriptions?',
      answer:
        'Yes. You can paste a job description, and the platform compares your resume against the selected role and required skills.'
    },
    {
      question: 'Is this useful for students?',
      answer:
        'Yes. It is designed for students, freshers, and job seekers who want to improve their resume before applying.'
    },
    {
      question: 'Which AI model is used?',
      answer:
        'The backend uses Gemini AI for resume feedback and combines it with custom scoring logic for skill matching.'
    }
  ]

  return (
    <section className='faq-section'>

      <div className='section-heading'>

        <h1>
          Frequently Asked Questions
        </h1>

        <p>
          Everything you need to know before analyzing your resume.
        </p>

      </div>

      <div className='faq-grid'>

        {
          faqs.map((item, index) => (
            <div
              className='card faq-card'
              key={index}
            >

              <h3>
                {item.question}
              </h3>

              <p>
                {item.answer}
              </p>

            </div>
          ))
        }

      </div>

    </section>
  )
}