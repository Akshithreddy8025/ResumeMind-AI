const express = require('express')

const cors = require('cors')

const multer = require('multer')

const pdfParse = require('pdf-parse')

const fs = require('fs')

require('dotenv').config()

const {
analyzeResume
} = require('./services/geminiService')

const app = express()


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors())

app.use(express.json())


// ===============================
// MULTER CONFIG
// ===============================

const upload = multer({

dest:'uploads/'

})


// ===============================
// TEST ROUTE
// ===============================

app.get('/',(req,res)=>{

res.json({

message:'Ethara AI Backend Running 🚀'

})

})


// ===============================
// ANALYZE RESUME ROUTE
// ===============================

app.post(

'/api/analyze',

upload.single('resume'),

async(req,res)=>{

try{

// CHECK FILE

if(!req.file){

return res.status(400).json({

success:false,

message:'Resume file missing'

})

}


// READ PDF

const pdfBuffer =
fs.readFileSync(req.file.path)


// PARSE PDF

const parsed =
await pdfParse(pdfBuffer)


// GEMINI AI ANALYSIS

const analysis =
await analyzeResume(

parsed.text,

req.body.company,

req.body.role,

req.body.jobDescription

)


// DELETE FILE AFTER ANALYSIS

fs.unlinkSync(req.file.path)


// SUCCESS RESPONSE

res.json({

success:true,

analysis

})

}catch(error){

console.log(error)


// DELETE FILE IF ERROR OCCURS

if(req.file){

try{

fs.unlinkSync(req.file.path)

}catch(err){

console.log(err)

}

}


console.log(error)

res.status(500).json({

success:false,

message:error.message,

error:error

})

}

}

)


// ===============================
// SERVER START
// ===============================

const PORT =
process.env.PORT || 5000

app.listen(PORT,()=>{

console.log(

`Server running on port ${PORT} 🚀`

)

})