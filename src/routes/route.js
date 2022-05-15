const express = require('express');
const router = express.Router();

const collegeController=require('../controllers/collegeController')
const internController=require('../controllers/internController')




router.post('/createCollege', collegeController.createCollege)

router.post('/createIntern', internController.createIntern)
router.get('/getCollege', collegeController.getCollege)
module.exports=router;