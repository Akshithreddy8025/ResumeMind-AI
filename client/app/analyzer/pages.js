import Navbar from '../../components/Navbar'
import UploadBox from '../../components/UploadBox'

export default function Analyzer(){

return(
<div className='page'>

<div className='container'>

<Navbar/>

<div style={{padding:'80px 0'}}>

<h1 style={{fontSize:'56px'}}>
AI Resume Analyzer
</h1>

<p style={{marginTop:'20px',color:'#cbd5e1'}}>
Upload your resume and get ATS score, keyword analysis,
company matching, and Gemini AI suggestions.
</p>

<UploadBox/>

</div>

</div>

</div>
)

}