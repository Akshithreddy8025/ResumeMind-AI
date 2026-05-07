'use client'

import { useState } from 'react'

import Navbar from '../../components/Navbar'
import ATSCard from '../../components/ATSCard'
import UploadBox from '../../components/UploadBox'
import SkillChart from '../../components/SkillChart'

export default function Dashboard(){

const [result,setResult] =
useState(null)

return(

<div className='page'>

<div className='glow one'></div>
<div className='glow two'></div>

<div className='container'>

<Navbar/>

{/* HERO SECTION */}

<div className='dashboard-hero'>

<h1 className='dashboard-title'>
AI Resume Dashboard
</h1>

<p className='dashboard-subtitle'>

Analyze resumes with Gemini AI,
ATS scoring,
company matching,
AI hiring prediction,
and role-based skill intelligence.

</p>

</div>


{/* ATS METRICS */}

{
result && (

<div className='grid dashboard-metrics'>

<ATSCard
title='ATS Score'
value={`${result.atsScore}%`}
/>

<ATSCard
title='Company Match'
value={`${result.companyMatch}%`}
/>

<ATSCard
title='Hiring Probability'
value={result.hiringProbability}
/>

</div>

)
}


{/* UPLOAD BOX */}

<div className='upload-section'>

<UploadBox
setResult={setResult}
/>

</div>


{/* RESULTS */}

{
result && (

<div className='results-wrapper'>


{/* SKILL GRAPH */}

<div className='chart-section'>

<SkillChart
skills={result.skills}
/>

</div>


{/* SKILLS + SUGGESTIONS */}

<div className='grid'>

<div className='card result-card'>

<h2>
Missing Skills
</h2>

<ul>

{
result?.missingSkills?.map(
(skill,index)=>(

<li key={index}>
{skill}
</li>

))
}

</ul>

</div>


<div className='card result-card'>

<h2>
AI Suggestions
</h2>

<ul>

{
result?.suggestions?.map(
(item,index)=>(

<li key={index}>
{item}
</li>

))
}

</ul>

</div>

</div>


{/* STRENGTHS + WEAKNESSES */}

<div className='grid'>

<div className='card result-card'>

<h2>
Resume Strengths
</h2>

<ul>

{
result?.strengths?.map(
(item,index)=>(

<li key={index}>
{item}
</li>

))
}

</ul>

</div>


<div className='card result-card'>

<h2>
Weaknesses
</h2>

<ul>

{
result?.weaknesses?.map(
(item,index)=>(

<li key={index}>
{item}
</li>

))
}

</ul>

</div>

</div>


{/* SUMMARY */}

<div className='card summary-card'>

<h2>
AI Summary
</h2>

<p>

{result.summary}

</p>

</div>

</div>

)

}

</div>

</div>

)

}