const express = require('express')

const {

getCompanyMatches

} = require(

'../controllers/companyController'

)

const router = express.Router()


// COMPANY MATCH ROUTE

router.get(

'/company-match',

getCompanyMatches

)

module.exports = router