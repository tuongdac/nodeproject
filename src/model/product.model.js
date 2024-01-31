
const mongoose = require('mongoose');

// product model
// schema 
const productSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true, // bắt buộc phải có
        unique: true, // không được trùng
    },
    name: {
        type:String,
        required: true
    },
    description: String,
    catergory:String,
    price:Number,
    importprice:Number,
    quantity:Number,
    weight:Number,
    image:String,
    role: {
        type: String,
        default: 'product',
    },
    createUser: String
}, {
    timestamps: true,
    // collection: 'products',
});

const Product = mongoose.model('Product', productSchema);

const getList = async (filter = {})=>{
    const data = await Product.find(filter);
    return data;
}

const getById = async (id)=>{
    const data = await Product.findById(id);
    return data;
}

const update = async (id,data)=>{
    console.log(id)
    const product = await Product.updateOne({id:id},data);
    console.log(product)
    return product;
}

const create = async (data)=>{
    
    const {id} = data;
    console.log(id)
    if(id==null||id==""){
        console.log('456');
        const newid = await getBiggestNumber();
        console.log(newid);
        data.id = newid;
    }
    const product = await Product.create(data);
    return product;
}

const deleteOne = async (id)=>{
    const product = await Product.deleteOne({_id:id});
    return product;
}

const getBiggestNumber = async ()=>{
    const theBiggest = await Product.findOne().sort({id:-1});
    if(theBiggest== null){
        return 'SP000001';
    }
    const newnum =  parseInt(theBiggest.id.slice(2))+1;
    return 'SP' + newnum.toString().padStart(6,'0');
}

module.exports = {
    getList,
    getById,
    update,
    create,
    deleteOne
}