const mongoose= require('mongoose');
const schema= mongoose.Schema;

const userSchema= new schema(
    {
    firstName :{
        type:String,
        require : true,
        minLength:2,
        maxLength:20
    },

    lastName :{
        type:String,
        minLength:2,
        maxLength:20
    },
    emailId:{
        type:String,
        require : true,
        unique: true
    },

    age:{
        type:Number,
        min:6,
        max:80,
    },

    role:
    {
        type:String,
        enum:['user','admin'],
        default: 'user'
    },

    problemSolved:{
        type:[String],
        default: []
    },
    password:
    {
        type:String,
        require:true
    },
},{
     timestamps:true
});

const User=mongoose.model("user",userSchema);
module.exports=User;
