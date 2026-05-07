import Link from 'next/link'

export default function Hero(){

return(
<div className='hero'>

<h1>
Build Your <span className='gradient'>AI Career</span>
</h1>

<p style={{marginTop:'20px'}}>
AI-powered ATS scoring and resume intelligence platform.
</p>

<Link href='/signup' className='button'>
Get Started
</Link>

</div>
)

}