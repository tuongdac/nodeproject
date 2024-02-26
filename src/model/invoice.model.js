
const moment = require('moment');
const mongoose = require('mongoose');

// invoice model
// schema 
const invoiceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true, // bắt buộc phải có
        unique: true, // không được trùng
    },
    client: {
        type: {
            clientid:{
                type:String,
                required:true
            },
            clientname:String,
            taxnumber:String,
            address:String,
            bankaccount:String,
            bankcode:String
        },
        required: true, // bắt buộc phải có
    },
    detail: [
        {
            productid: String,
            productname: String,
            quantity: Number
        }
    ],
    amount: Number,
    discount: Number,
    totalafter: Number,
    VAT:Number,
    totalVAT: Number,
    total:Number,
    paid: Number,
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

const getList = async (filter = {}) => {
    const data = await Invoice.find(filter);
    return data;
}

const getWeekList = async (filter = {}) => {
    const data = await Invoice.aggregate(filter);
    return data;
}

const getSevenLastDate = async (filter = []) => {
    const barNumber = 4;
    filter = [
        {
            $project:
            {
                createdAt: { $substr: ["$createdAt", 0, 10] },
                amount: 1
            }
        },
        {
            $group: {
                _id: "$createdAt",
                total:
                {
                    $sum: "$amount"
                }
            }
        },
        {
            $sort: {
                _id: -1
            }
        }
    ];
    var returndata = [];
    const data = await Invoice.aggregate(filter);
    loop1:
    for( var i = 0; i<=barNumber; i++ ){
        var currentdate = formatDate(new Date(moment().subtract(i, 'days')));
        loop2:
        for(var j =0; j <data.length;j++){
            if(currentdate==data[j]._id){
                returndata.push({"_id":currentdate,"total":data[j].total});
                continue loop1;
            }
        }
        returndata.push({"_id":currentdate,"total":0});
    }
    return returndata;
}

function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', {year: 'numeric'});
    const month = date.toLocaleString('default', {
      month: '2-digit',
    });
    const day = date.toLocaleString('default', {day: '2-digit'});
  
    return [year, month, day].join('-');
  }

const getById = async (id) => {
    const data = await Invoice.findById(id);
    return data;
}

const update = async (id, data) => {
    console.log(id)
    const invoice = await Invoice.updateOne({ id: id }, data);
    console.log(invoice)
    return invoice;
}

const create = async (data) => {
    const { id } = data;
    console.log("id",id);
    console.log("data",data);
    if (id == null || id == "") {
        const newid = await getBiggestNumber();
        console.log(newid);
        data.id = newid;
    }
    data = {...data,"totalafter":(data.amount*(1-data.discount/100))} ;
    const totalVAT = data.totalafter*data.VAT/100;
    data = {...data,"totalVAT":totalVAT} ;
    const total = data.totalafter+totalVAT;
    data = {...data,"total":total} ;
    const invoice = await Invoice.create(data);
    return invoice;
}

const deleteOne = async (id) => {
    const invoice = await Invoice.deleteOne({ _id: id });
    return invoice;
}

const getBiggestNumber = async () => {
    const theBiggest = await Invoice.findOne().sort({ id: -1 });
    const newnum = parseInt(theBiggest.id.slice(2)) + 1;
    return 'HD' + newnum.toString().padStart(6, '0');
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