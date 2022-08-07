import mongoose from "mongoose";
const {Schema,model} = mongoose;
const user = model('usermodel',new Schema({
    username:{
        type:String,
        unique:true,
    },
    role:String,
}));

export default user