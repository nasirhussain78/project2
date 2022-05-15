
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")

const isValid = function (value) {
  if (typeof value === 'undefined' || typeof value === 'null') return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const createCollege = async (req, res) => {
  try {
    let data = req.body;
    const fullName = data.fullName;

    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, msg: " Data is  missing" });
    }
    

//abbrebeation is required
    const input1 = isValid(data.name);
    if (!input1) {
      return res.status(400).send({ status: false, msg: " college Name is required" });
    }

    // Abbrevation must be a single word
    const name=data.name.trim()
    const collegeT = name.split(" ");
    const length = collegeT.length;
    if (length> 1) {
      return res.status(400).send({status: false,msg: "Abbreviated college name should be in a single word",});
    }
// colege full name is required
    const req0 = isValid(fullName);
    if (!req0) {return res.status(400).send({ status: false, msg: " college FullName is required" });
    }
//logolink is required
    const req1 = isValid(data.logoLink);
    if (!req1) { return res.status(400).send({ status: false, msg: " Logolink is required" });
    }
//college already exist with this abbrebeaiation
    const isNameAlreadyUsed = await collegeModel.findOne({ name:name });
    if (isNameAlreadyUsed) {
      return res.status(400).send({ status: false, msg: `${name} college already exist with this abbrebeaiation name` });
    }
//college already exist with this name
    const isFullreadyUsed = await collegeModel.findOne({ fullName });
    if (isFullreadyUsed) {
      return res.status(400).send({ status: false, msg: `${fullName} college already exist with this name` });
    }

    // to validate logoLink
    const logoLink=data.logoLink.trim()
    if (!(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(logoLink)))
      return res.status(400).send({ status: false, msg: " logoLink is invalid" })

    let saveData = await collegeModel.create(data);
    res.status(201).send({ status: true, msg: saveData });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};


const getCollege = async function (req, res) {
  try {

      if (!isValid(req.query.collegeName)) {
          res.status(400).send({ status: false, message: 'Please Provide college name' })
          return
      }
      let collegeDetail = await collegeModel.findOne({ name: req.query.collegeName, isDeleted: false })
      if (!collegeDetail) {
        return res.status(400).send({ status: false, msg: "No college found " })
         
      }

      let { _id, name, fullName, logoLink } = collegeDetail//initialise

      let allInterns = await internModel.find({ collegeId: _id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })
     //if (allInterns.length === 0) return res.status(400).send({ status: false, msg: "no intern applied for this college" })

      let College = { name:name, fullName:fullName, logoLink:logoLink, intrest: allInterns }
    
      return res.status(200).send({status:true,data:College})
    
  }
  catch (err) {
     return res.status(500).send({ status: false, msg: err.message })
  }

}


module.exports.createCollege = createCollege;
module.exports.getCollege = getCollege





