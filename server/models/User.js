import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require: true,
        trim: true
    },
    username:{
        type:String,
        require: true,
        trim: true
    },
    email:{
        type:String,
        require: true,
        trim: true
    },
    mobile:{
        type:String,
        require: true,
        trim: true
    },

});
const User = mongoose.model('User',userSchema)
export default User  