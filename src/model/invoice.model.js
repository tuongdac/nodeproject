
const mongoose = require('mongoose');

// invoice model
// schema 
const invoiceSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true, // bắt buộc phải có
        unique: true, // không được trùng
    },
    client: String,
    detail: [
        {
            productid:String,
            productname:String,
            quantity:Number
        }
    ],
    amount:Number,
    discount:Number,
    paid:Number,
    role: {
        type: String,
        default: 'invoice',
    },
    createUser: String
}, {
    timestamps: true,
    // collection: 'invoices',
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

const getList = async (filter = {})=>{
    const data = await Invoice.find(filter);
    return data;
}

const getWeekList = async (filter = {})=>{
    const data = await Invoice.aggregate(filter);
    return data;
}

const getSevenLastDate = async (filter = [])=>{
    const data = await Invoice.aggregate(filter);
    return data;
}

const getById = async (id)=>{
    const data = await Invoice.findById(id);
    return data;
}

const update = async (id,data)=>{
    console.log(id)
    const invoice = await Invoice.updateOne({id:id},data);
    console.log(invoice)
    return invoice;
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
    const invoice = await Invoice.create(data);
    return invoice;
}

const deleteOne = async (id)=>{
    const invoice = await Invoice.deleteOne({_id:id});
    return invoice;
}

const getBiggestNumber = async ()=>{
    const theBiggest = await Invoice.findOne().sort({id:-1});
    const newnum =  parseInt(theBiggest.id.slice(2))+1;
    return 'HD' + newnum.toString().padStart(6,'0');
}

module.exports = {
    getList,
    getById,
    update,
    create,
    deleteOne,
    getSevenLastDate, 
    getWeekList
}