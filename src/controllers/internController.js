const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")


const isValid = function (value) {
  if (typeof value === 'undefined' || typeof value === 'null') return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true
}


const createIntern = async function (req, res) {

 try {
    const data = req.body
  const collegeName = data.collegeName
    // data is required
    if (Object.keys(data) == 0) {
      return res.status(400).send({ status: false, msg: " data is  missing" })
    }
     // name is required
    const req0 = isValid(data.name)
    if (!req0) {
      return res.status(400).send({ status: false, msg: " name is required" })

    }

    //duplicate Name
    const name=data.name.trim()
    const duplicateName = await internModel.findOne({ name: name })
    if (duplicateName) {
      return res.status(400).send({ status: false, msg: 'This name is already registered.' })
    }

    // email is required
    const req1 = isValid(data.email)
    if (!req1) {
      return res.status(400).send({ status: false, msg: " email is required" })

    }

    
    //to validate email
    const email=data.email.trim()
    if (!(/^([\w]*[\w\.]*(?!\.)@gmail.com)$/.test(email)))
      return res.status(400).send({ status: false, msg: " email is invalid" })



    //duplicate email
    const isEmailAlreadyUsed = await internModel.findOne({ email });

    if (isEmailAlreadyUsed) {
      return res.status(400).send({ status: false, msg: `${email} email is already used` })
    }


    // mobile is required
    const req2 = isValid(data.mobile)
    if (!req2) {
      return res.status(400).send({ status: false, msg: " mobile is required" })
    }


    // to validate Mobile
    const mobile=data.mobile.trim()
    if (!(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(mobile)))
      return res.status(400).send({ status: false, msg: " mobile is invalid" })

    //duplicate mobile
    const isMobileAlreadyUsed = await internModel.findOne({ mobile });
    if (isMobileAlreadyUsed) {
      return res.status(400).send({ status: false, msg: `${mobile} mobile is already used` })
    }
    
  const collegeResponse = await collegeModel.findOne({name:collegeName, isDeleted: false }); 
  if(!collegeResponse){return res.status(400).send({status:false,msg:'college does not exist with this name'})}
  data.collegeId = collegeResponse._id; 
  // delete data.collegeName; 

  const interRes = await internModel.create(data);

  res.status(201).send({status:true,data:interRes})

  } catch (err) {
    res.status(500).send({ error: err.message })
  }
}

module.exports.createIntern = createIntern








