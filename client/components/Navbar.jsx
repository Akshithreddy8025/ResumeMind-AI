import Link from 'next/link'

export default function Navbar(){

return(
<div className='navbar'>

<h2>ResumeMind AI</h2>

<div className='navlinks'>
<Link href='/'>Home</Link>
<Link href='/dashboard'>Dashboard</Link>
<Link href='/templates'>Templates</Link>
<Link href='/login'>Login</Link>
<Link href='/signup'>Signup</Link>
</div>

</div>
)

}