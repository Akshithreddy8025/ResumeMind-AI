'use client'

import Navbar from '../../components/Navbar'

export default function Profile(){

return(

<div className='page'>

<div className='glow one'></div>
<div className='glow two'></div>

<div className='container'>

<Navbar/>

<div
className='card'
style={{
marginTop:'60px',
padding:'40px'
}}
>

<h1
style={{
fontSize:'54px',
marginBottom:'20px'
}}
>

Profile Dashboard

</h1>

<p
style={{
color:'#94a3b8',
lineHeight:'1.8',
fontSize:'18px'
}}
>

Welcome to your AI Resume profile dashboard.

Manage your resume insights,
career analysis,
and AI recommendations here.

</p>

</div>

</div>

</div>

)

}