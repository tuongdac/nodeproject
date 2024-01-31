const { Router } = require("express");
const { invoiceController } = require('../controller');
const { patchInvoiceSchema } = require('../validate/invoice.validate');
const { validateRequest } = require('../validate/validate');


const invoiceRouter = Router();

invoiceRouter.get('/getall', invoiceController.getListInvoice);
invoiceRouter.get('/getsalebyday', invoiceController.getSaleByDay);
invoiceRouter.post('/create', invoiceController.createInvoice);
invoiceRouter.patch('/update', invoiceController.updateInvoice);
// invoiceRouter.patch('/update',validateRequest(patchInvoiceSchema), invoiceController.updateInvoice);
invoiceRouter.delete('/delete/:id', invoiceController.deleteInvoice);


module.exports = invoiceRouter;