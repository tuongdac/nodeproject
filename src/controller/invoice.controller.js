const moment = require('moment');
const { getUserId } = require('../helper/token')

const { getList, updateInvoice: handleUpdateInvoice, create, deleteOne, update, getSevenLastDate, getWeekList } = require('../model/invoice.model');
const { getUserById } = require('../model/user.model');


const GMTCTOLERANCE = 0;
const getListInvoice = async (req, res) => {
    try {
        const { option } = req.query;
        const date = new Date();
        var fromdate = '';
        var todate = '';
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear()
        var condition = null;
        if (option == 'TW') {
            fromdate =  moment().startOf('isoweek').toDate();
            console.log(fromdate);
            todate = moment().endOf('isoweek').toDate();
            todate.setDate(todate.getDate() - 1);
            console.log(todate);
            condition = { createdAt: { $gte: fromdate, $lte: todate } };
        } else if (option == 'LW') {
            fromdate = moment().subtract(1, 'weeks').startOf('isoweek').toDate();
            todate = moment().subtract(1, 'weeks').endOf('isoweek').toDate();
            todate.setDate(todate.getDate() - 1);
            condition = { createdAt: { $gte: fromdate, $lte: todate } };
        } else if (option == 'TM') {
            fromdate = new Date(year, month, 1,GMTCTOLERANCE);
            console.log(fromdate);
            // todate = new Date(year, month, 0)
            condition = { createdAt: { $gte: fromdate, $lte: date } };
        } else if (option == 'LM') {
            fromdate = new Date(year, month-1, 1,GMTCTOLERANCE);
            console.log(fromdate);
            todate = new Date(year, month, 1,GMTCTOLERANCE);
            console.log(todate);
            condition = { createdAt: { $gte: fromdate, $lte: todate } };
        }else if (option == 'TY') {
            fromdate = new Date(year, 0, 1, GMTCTOLERANCE);
            console.log(fromdate);
            // todate = new Date(year, month, 0)
            condition = { createdAt: { $gte: fromdate, $lte: date } };
        } else if (option == 'LY') {
            fromdate = new Date(year-1, 0, 1, GMTCTOLERANCE);
            console.log(fromdate);
            todate = new Date(year, 0, 1, GMTCTOLERANCE);
            console.log(todate);
            condition = { createdAt: { $gte: fromdate, $lte: todate } };
        } else if (option == 'MA') {
            const { fromdate } = req.query;
            console.log(fromdate);
            const { todate } = req.query;
            condition = { createdAt: { $gte: fromdate, $lte: todate } };
        }
        console.log('condition:', condition);
        const invoices = await getList(condition);
        res.json({
            data: invoices,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const getSaleByDay = async (req, res) => {
    try {
        const result = await getSevenLastDate(null);
        console.log('result:', result);
        res.json({
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const getInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        deleteInvoice(id);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Delete Invoice: ' + id);
        deleteOne(id);
        res.status(200).json({
            message: 'delete invoice success'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const createInvoice = async (req, res) => {
    try {
        const data = req.body;
        // const userid = getUserId(req,res);
        // const user = await getUserById(req.user.id);
        console.log('req.user.name', req.user.name);
        data.createUser = req.user.name;
        const invoice = await create(data);
        res.status(200).json({
            message: 'create invoice success'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}
const updateInvoice = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        const body = req.body;
        await handleUpdateInvoice(id, body);
        res.status(300).json({
            message: 'replace invoice success',
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}


module.exports = {
    getListInvoice,
    getSaleByDay,
    createInvoice,
    updateInvoice,
    deleteInvoice
}
