'use client'

export default function ATSCard({
  title = 'Metric',
  value = '0%',
  subtitle = ''
}) {
  return (
    <div className='card metric-card'>

      <div className='metric-card-top'>

        <h3>
          {title}
        </h3>

        {
          subtitle ? (
            <p>
              {subtitle}
            </p>
          ) : null
        }

      </div>

      <div className='metric'>
        {value}
      </div>

    </div>
  )
}