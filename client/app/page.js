import Navbar from '../components/Navbar'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function Home(){

return(

<div className="page">

<div className="glow one"></div>
<div className="glow two"></div>

<div className="container">

<Navbar/>

{/* HERO SECTION */}

<div className="hero">

<h1>
Build Your <span className="gradient">
AI Career
</span>

<br/>

With Smart Resume Intelligence

</h1>

<p>

Premium AI-powered resume analysis platform with ATS scoring,
company-specific role matching, Gemini AI integration,
and intelligent career recommendations.

</p>

<div className='hero-buttons'>

<Link
href="/login"
className="button"
>

Get Started

</Link>



</div>

</div>


{/* FEATURES SECTION */}

<div className='features-grid'>

<div className='card'>

<h2>AI ATS Scoring</h2>

<p>
Get recruiter-style ATS analysis with keyword matching.
</p>

</div>

<div className='card'>

<h2>Company Matching</h2>

<p>
Analyze your resume for Google, Amazon, Meta, and more.
</p>

</div>

<div className='card'>

<h2>Gemini AI Suggestions</h2>

<p>
Improve resume bullets and skills using Gemini AI.
</p>

</div>

</div>


{/* FAQ */}

<FAQ/>

{/* FOOTER */}

<Footer/>

</div>

</div>

)

}