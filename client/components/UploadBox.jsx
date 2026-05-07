'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

import {
FiUploadCloud
} from 'react-icons/fi'

import SkillChart from './SkillChart'

export default function UploadBox(){

const [file,setFile] = useState(null)

const [loading,setLoading] =
useState(false)

const [jobDescription,
setJobDescription] = useState('')

const [company,setCompany] =
useState('Google')

const [role,setRole] =
useState('AI Engineer')

const [result,setResult] =
useState(null)

const {
getRootProps,
getInputProps
} = useDropzone({

accept:{
'application/pdf':['.pdf']
},

onDrop:(acceptedFiles)=>{

setFile(acceptedFiles[0])

}

})

const handleAnalyze = async()=>{

if(!file){

alert('Upload Resume First')

return

}

try{

setLoading(true)

const formData = new FormData()

formData.append(
'resume',
file
)

formData.append(
'company',
company
)

formData.append(
'role',
role
)

formData.append(
'jobDescription',
jobDescription
)

const response =
await axios.post(

'https://resumemind-ai.onrender.com/api/analyze',

formData

)

setResult(
response.data.analysis
)

}catch(error){

console.log(error)

alert('Analysis Failed')

}

setLoading(false)

}

return(

<div className='upload-wrapper'>

<div className='upload-header'>

<h1>
AI Resume Analyzer
</h1>

<p>
Upload your resume and get
ATS analysis,
AI suggestions,
company matching,
and role-based skill insights.
</p>

</div>


<div
{...getRootProps()}
className='modern-upload'
>

<input {...getInputProps()} />

<div className='upload-icon'>

<FiUploadCloud/>

</div>

<h2>

{
file
?
file.name
:
'Drop Resume Here'
}

</h2>

<p>
PDF only • ATS Optimized • AI Ready
</p>

<button className='upload-btn'>

Upload Resume

</button>

</div>


<textarea

placeholder='Paste Job Description'

value={jobDescription}

onChange={(e)=>
setJobDescription(
e.target.value
)
}

/>


<select
value={company}
onChange={(e)=>
setCompany(
e.target.value
)
}
>

<option>Google</option>
<option>Microsoft</option>
<option>Amazon</option>
<option>Meta</option>
<option>Netflix</option>
<option>OpenAI</option>
<option>Apple</option>
<option>Adobe</option>
<option>Intel</option>
<option>NVIDIA</option>
<option>Infosys</option>
<option>TCS</option>
<option>Wipro</option>
<option>Accenture</option>
<option>Zoho</option>
<option>Cisco</option>
<option>Uber</option>
<option>Spotify</option>
<option>Swiggy</option>
<option>Flipkart</option>

</select>


<select
value={role}
onChange={(e)=>
setRole(
e.target.value
)
}
>

<option>AI Engineer</option>
<option>ML Engineer</option>
<option>Data Scientist</option>
<option>Frontend Developer</option>
<option>Backend Developer</option>
<option>Full Stack Developer</option>
<option>Software Engineer</option>
<option>Cloud Engineer</option>
<option>DevOps Engineer</option>
<option>Cyber Security Analyst</option>
<option>UI/UX Designer</option>

</select>


<button
className='button analyze-btn'
onClick={handleAnalyze}
>

{
loading
?
'Analyzing Resume...'
:
'Analyze Resume'
}

</button>


{
result && (

<div className='results-section'>

<div className='grid'>

<div className='card metric-card'>

<h3>ATS Score</h3>

<div className='metric'>
{result.atsScore}%
</div>

</div>

<div className='card metric-card'>

<h3>Company Match</h3>

<div className='metric'>
{result.companyMatch}%
</div>

</div>

<div className='card metric-card'>

<h3>Hiring Probability</h3>

<div className='metric-small'>
{result.hiringProbability}
</div>

</div>

</div>


<SkillChart
skills={result.skills}
/>


<div className='grid'>

<div className='card'>

<h2>Missing Skills</h2>

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


<div className='card'>

<h2>Resume Strengths</h2>

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


<div className='card'>

<h2>Weaknesses</h2>

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


<div className='card'>

<h2>AI Suggestions</h2>

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

</div>

)

}

</div>

)

}