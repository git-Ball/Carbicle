const {Schema,model} = require('mongoose')

const { comparePassword,hashPassword } = require('../services/util.js')

const userSchema =new Schema({
    username:{type:String,required:true,minlength:3, unique:true},
    hashedPassword:{type:String,required:true}
});
userSchema.methods.comparePassword = async function(password){
    // Use bcrypt to has and compare incoming password with stores hashed password
    return await comparePassword(password,this.hashedPassword);
};
userSchema.pre('save', async function(){
  
    this.hashedPassword = await hashPassword(this.hashedPassword)
    
    console.log('Saving > > >',this);
});

const User = model('User',userSchema)
module.exports =User;