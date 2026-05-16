'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

export default function SkillChart({
  skills = [],
  title = 'Skill Analytics',
  xKey = 'name'
}) {
  if (!skills || skills.length === 0) {
    return (
      <div className='card chart-card'>
        <h2 style={{ marginBottom: '12px' }}>
          {title}
        </h2>

        <p className='muted-text'>
          No skill data available yet.
        </p>
      </div>
    )
  }

  return (
    <div className='card chart-card'>

      <div className='chart-header'>
        <div>
          <h2>
            {title}
          </h2>

          <p>
            Scores are calculated from resume skills, job description match,
            project usage, and role relevance.
          </p>
        </div>
      </div>

      <div className='chart-wrapper'>
        <ResponsiveContainer
          width='100%'
          height={360}
          minWidth={300}
          minHeight={300}
        >
          <BarChart
            data={skills}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 60
            }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='rgba(148, 163, 184, 0.18)'
            />

            <XAxis
              dataKey={xKey}
              tick={{
                fill: '#cbd5e1',
                fontSize: 12
              }}
              angle={-28}
              textAnchor='end'
              interval={0}
              height={80}
            />

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: '#cbd5e1',
                fontSize: 12
              }}
            />

            <Tooltip
              contentStyle={{
                background: '#020617',
                border: '1px solid rgba(148, 163, 184, 0.25)',
                borderRadius: '14px',
                color: '#e5e7eb'
              }}
              cursor={{
                fill: 'rgba(59, 130, 246, 0.08)'
              }}
            />

            <Bar
              dataKey='score'
              radius={[10, 10, 0, 0]}
              fill='#38bdf8'
              maxBarSize={55}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}