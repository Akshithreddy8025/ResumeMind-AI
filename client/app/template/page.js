'use client'
import Navbar from '../../components/Navbar'

export default function Templates(){

const templates = [

{
name:'AI Engineer Resume',
description:'Modern ATS-friendly AI resume template.'
},

{
name:'Full Stack Developer Resume',
description:'Professional developer resume template.'
},

{
name:'Data Scientist Resume',
description:'Optimized for AI and analytics roles.'
},

{
name:'Cloud Engineer Resume',
description:'Perfect for AWS and DevOps profiles.'
}

]

return(

<div className='page'>

<div className='glow one'></div>
<div className='glow two'></div>

<div className='container'>

<Navbar/>

<div style={{padding:'80px 0'}}>

<h1
style={{
fontSize:'56px',
marginBottom:'20px'
}}
>

Resume Templates

</h1>

<p
style={{
color:'#94a3b8',
marginBottom:'40px'
}}
>

Choose professional ATS-friendly resume templates.

</p>

<div
style={{
display:'grid',
gridTemplateColumns:
'repeat(auto-fit,minmax(280px,1fr))',
gap:'20px'
}}
>

{
templates.map((item,index)=>(

<div
className='card'
key={index}
>

<h2>

{item.name}

</h2>

<p
style={{
marginTop:'15px',
lineHeight:'1.7',
color:'#94a3b8'
}}
>

{item.description}

</p>

<button
className='button'
style={{
marginTop:'20px'
}}
>

Use Template

</button>

</div>

))
}

</div>

</div>

</div>

</div>

)

}