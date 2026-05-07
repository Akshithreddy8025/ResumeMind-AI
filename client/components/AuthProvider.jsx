'use client'

import { useEffect } from 'react'

import {

onAuthStateChanged

} from 'firebase/auth'

import { auth } from '../lib/firebase'

export default function AuthProvider(){

useEffect(()=>{

const unsubscribe =
onAuthStateChanged(auth,(user)=>{

if(user){

console.log(
'Logged in:',
user.email
)

}

})

return ()=>unsubscribe()

},[])

return null

}