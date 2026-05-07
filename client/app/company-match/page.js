'use client'
import Navbar from '../../components/Navbar'

export default function CompanyMatch(){

const companies = [

{
name:'Google',
match:'84%'
},

{
name:'Amazon',
match:'79%'
},

{
name:'Meta',
match:'72%'
},

{
name:'Netflix',
match:'68%'
},

{
name:'OpenAI',
match:'74%'
}

]

return(

<div className='page'>

<div className='container'>

<Navbar/>

<div style={{padding:'80px 0'}}>

<h1 style={{fontSize:'56px'}}>

Company Match Analysis

</h1>

<p
style={{
marginTop:'20px',
color:'#cbd5e1'
}}
>

See how your resume matches
top companies using AI ATS analysis.

</p>


<div
style={{
display:'grid',
gridTemplateColumns:
'repeat(auto-fit,minmax(250px,1fr))',
gap:'20px',
marginTop:'40px'
}}
>

{
companies.map((item,index)=>(

<div
className='card'
key={index}
>

<h2>

{item.name}

</h2>

<h1
style={{
marginTop:'20px',
fontSize:'48px'
}}
>

{item.match}

</h1>

<p style={{marginTop:'10px'}}>

Resume compatibility score
for this company.

</p>

<button
className='button'
style={{marginTop:'20px'}}
>

View Analysis

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