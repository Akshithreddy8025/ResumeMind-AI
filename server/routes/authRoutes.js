const express = require('express')

const router = express.Router()


// TEST AUTH ROUTE

router.get(

'/auth-test',

(req,res)=>{

res.json({

success:true,

message:'Authentication Route Working 🚀'

})

}

)


// LOGIN ROUTE

router.post(

'/login',

(req,res)=>{

const {

email,
password

} = req.body


if(!email || !password){

return res.status(400).json({

success:false,

message:'Email and Password Required'

})

}


res.json({

success:true,

message:'Login Successful',

user:{
email
}

})

}

)


// SIGNUP ROUTE

router.post(

'/signup',

(req,res)=>{

const {

name,
email,
password

} = req.body


if(
!name ||
!email ||
!password
){

return res.status(400).json({

success:false,

message:'All Fields Required'

})

}


res.json({

success:true,

message:'Signup Successful',

user:{
name,
email
}

})

}

)

module.exports = router