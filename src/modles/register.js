const mongoose=require("mongoose");
const userinput=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})
const Input=new mongoose.model("Input",userinput);
module.exports=Input; 

