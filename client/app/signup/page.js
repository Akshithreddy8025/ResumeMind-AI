'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import Navbar from '../../components/Navbar'

import {

auth,

createUserWithEmailAndPassword

} from '../../lib/firebase'

export default function Signup(){

const router = useRouter()

const [form,setForm] =
useState({

name:'',
email:'',
college:'',
password:''

})

const [loading,setLoading] =
useState(false)

const handleSignup = async()=>{

try{

setLoading(true)

await createUserWithEmailAndPassword(

auth,
form.email,
form.password

)

alert('Account Created Successfully')

router.push('/login')

}catch(error){

alert(error.message)

}

setLoading(false)

}

return(

<div className='page'>

<div className='glow one'></div>
<div className='glow two'></div>

<div className='container'>

<Navbar/>

<div className='auth-card card'>

<h1>
Create Account
</h1>

<p>
Start your AI-powered career journey.
</p>

<input
placeholder='Full Name'
onChange={(e)=>
setForm({
...form,
name:e.target.value
})
}
/>

<input
type='email'
placeholder='Email'
onChange={(e)=>
setForm({
...form,
email:e.target.value
})
}
/>

<input
placeholder='College'
onChange={(e)=>
setForm({
...form,
college:e.target.value
})
}
/>

<input
type='password'
placeholder='Password'
onChange={(e)=>
setForm({
...form,
password:e.target.value
})
}
/>

<button
className='button'
onClick={handleSignup}
>

{
loading
?
'Creating Account...'
:
'Create Account'
}

</button>


<div
style={{
marginTop:'20px',
textAlign:'center',
color:'#94a3b8'
}}
>

Already have an account?

<Link
href='/login'
style={{
marginLeft:'8px',
color:'#8b5cf6',
fontWeight:'700'
}}
>

Login

</Link>

</div>

</div>

</div>

</div>

)

}