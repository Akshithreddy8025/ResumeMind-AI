const fs = require('fs')
const pdfParse = require('pdf-parse')

const {
runGemini
} = require('../services/geminiService')

exports.analyzeResume = async(req,res)=>{

try{

const pdfBuffer = fs.readFileSync(
req.file.path
)

const parsed = await pdfParse(pdfBuffer)

const result = await runGemini(
parsed.text
)

res.json({
success:true,
result
})

}catch(error){

console.log(error)

res.status(500).json({
error:error.message
})

}

}