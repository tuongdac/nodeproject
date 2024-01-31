const { Router } = require("express");
const { productController } = require('../controller');
// const { patchInvoiceSchema } = require('../validate/invoice.validate');
const { validateRequest } = require('../validate/validate');


const productRouter = Router();

productRouter.get('/getall', productController.getListProduct);
// productRouter.get('/get', productController.getproduct);
productRouter.post('/create', productController.createProduct);
productRouter.patch('/update', productController.updateProduct);
// productRouter.patch('/update',validateRequest(patchproductSchema), productController.updateproduct);
productRouter.delete('/delete/:id', productController.deleteProduct);


module.exports = productRouter;