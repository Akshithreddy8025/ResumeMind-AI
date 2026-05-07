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
marginTop:'60px'
}}
>

<h1
style={{
fontSize:'54px',
marginBottom:'20px'
}}
>

My Profile

</h1>

<p
style={{
color:'#94a3b8',
lineHeight:'1.8'
}}
>

Welcome to your AI Resume profile dashboard.

</p>

</div>

</div>

</div>

)

}