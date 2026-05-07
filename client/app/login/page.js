'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import Navbar from '../../components/Navbar'

import {

auth,
provider,

signInWithPopup,

signInWithEmailAndPassword

} from '../../lib/firebase'

export default function Login(){

const router = useRouter()

const [email,setEmail] =
useState('')

const [password,setPassword] =
useState('')

const [loading,setLoading] =
useState(false)


// =======================
// EMAIL LOGIN
// =======================

const handleLogin = async()=>{

try{

setLoading(true)

await signInWithEmailAndPassword(

auth,
email,
password

)

router.push('/dashboard')

}catch(error){

alert(error.message)

}

setLoading(false)

}


// =======================
// GOOGLE LOGIN
// =======================

const handleGoogleLogin = async()=>{

try{

await signInWithPopup(
auth,
provider
)

router.push('/dashboard')

}catch(error){

alert(error.message)

}

}


return(

<div className='page'>

<div className='glow one'></div>
<div className='glow two'></div>

<div className='container'>

<Navbar/>

<div className='auth-wrapper'>

<div className='auth-card'>

<h1>

Welcome Back

</h1>

<p>

Login to continue your AI career journey.

</p>


<input
type='email'
placeholder='Email'
value={email}
onChange={(e)=>
setEmail(e.target.value)
}
/>

<input
type='password'
placeholder='Password'
value={password}
onChange={(e)=>
setPassword(e.target.value)
}
/>


<button
className='button auth-btn'
onClick={handleLogin}
>

{
loading
?
'Logging in...'
:
'Login'
}

</button>


<div className='divider'>

<span>OR</span>

</div>


<button
className='google-btn'
onClick={handleGoogleLogin}
>

Continue with Google

</button>


<p className='auth-switch'>

Don't have an account?

<Link href='/signup'>

Create Account

</Link>

</p>

</div>

</div>

</div>

</div>

)

}