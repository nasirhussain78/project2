

const mongoose=require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema= new mongoose.Schema({

    name:{
        type:String,
       required:true,
       trim:true
    },
    email : {
        type : String,
        trim : true,
        unique: true,
        required : true,
        lowercase : true,
       match : [/^([\w]*[\w\.]*(?!\.)@gmail.com)$/, 'Please fill a valid email address']
    },
    mobile:{
  type:Number,            
  required:true,
  unique:true,
  trim:true,
  match:[/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/]
    },
    collegeId:{
        type:ObjectId,
        ref:'college'
    },
    isDeleted:{
        type:Boolean,
        default:false
    },

},{timestamps:true}
)

module.exports=mongoose.model('interShip', internSchema)


















