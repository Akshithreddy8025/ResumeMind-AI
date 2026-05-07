exports.getCompanyMatches = async(req,res)=>{

try{

const companies = [

{
company:'Google',
match:'84%',
role:'AI Engineer'
},

{
company:'Amazon',
match:'79%',
role:'Backend Developer'
},

{
company:'Meta',
match:'72%',
role:'ML Engineer'
},

{
company:'Netflix',
match:'68%',
role:'Frontend Developer'
},

{
company:'OpenAI',
match:'74%',
role:'AI Research Intern'
}

]

res.json({

success:true,

companies

})

}catch(error){

console.log(error)

res.status(500).json({

success:false,

message:'Company Match Failed',

error:error.message

})

}

}