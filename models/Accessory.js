const {Schema,model} = require('mongoose');

const accessorySchema = new Schema({
    name:{type: String,required:true},
    description:{type:String,default:''},
    imageUrl:{type:String,default:'noimage.jpg'},
    price:{type:Number,minL:0}
});

const Accessory = model('Accessory',accessorySchema)
module.exports = Accessory;