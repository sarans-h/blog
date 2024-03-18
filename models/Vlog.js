const mongoose=require('mongoose');
const blogSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true
    },
    comment:{
        type:String,
        trim:true,
        required:true
    }
},{timestamps:true});

let Vlog=mongoose.model("Vlog",blogSchema);
module.exports=Vlog;