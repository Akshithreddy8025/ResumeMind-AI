const {
GoogleGenerativeAI
} = require('@google/generative-ai')

const genAI =
new GoogleGenerativeAI(
process.env.GEMINI_API_KEY
)

exports.analyzeResume = async (

resumeText,
company,
role,
jobDescription

)=>{

try{

const model =
genAI.getGenerativeModel({

model:'gemini-1.5-flash-8b'

})

const prompt = `

You are an advanced ATS AI Resume Analyzer.

Analyze this resume carefully.

Company:
${company}

Role:
${role}

Job Description:
${jobDescription}

Resume:
${resumeText}

Return ONLY valid JSON.

{
"atsScore":85,
"companyMatch":78,
"hiringProbability":"High",

"skills":[
{
"name":"React",
"score":90
},
{
"name":"Node.js",
"score":85
},
{
"name":"MongoDB",
"score":70
}
],

"missingSkills":[
"AWS",
"Docker",
"Kubernetes"
],

"strengths":[
"Strong frontend projects",
"Good technical skills"
],

"weaknesses":[
"Missing cloud deployment experience"
],

"suggestions":[
"Add quantified achievements",
"Improve resume summary"
],

"summary":"Good resume with strong development skills but needs better ATS optimization."

}

`

const result =
await model.generateContent(prompt)

const response =
await result.response.text()

console.log(response)

const cleanResponse =
response
.replace(/```json/g,'')
.replace(/```/g,'')
.trim()

return JSON.parse(cleanResponse)

}catch(error){

console.log(
'Gemini Error:',
error
)

return {

atsScore:75,

companyMatch:70,

hiringProbability:'Medium',

skills:[
{
name:'React',
score:85
},
{
name:'Node.js',
score:80
},
{
name:'MongoDB',
score:70
}
],

missingSkills:[
'AWS',
'Docker'
],

strengths:[
'Strong projects',
'Good coding profile'
],

weaknesses:[
'Needs better ATS keywords'
],

suggestions:[
'Add measurable metrics',
'Improve summary'
],

summary:
'Resume analysis temporarily used fallback response because AI parsing failed.'

}

}

}