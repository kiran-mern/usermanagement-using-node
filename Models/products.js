const mongoose=require('mongoose')
const url='mongodb://localhost:27017/test'
const connect =mongoose.connect(url)
connect.then(()=>{
    console.log('success');
})
.catch (()=>{
    console.log('error');
})
const product=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    }
     

})
const productData=new mongoose.model('products',product)
module.exports=productData
