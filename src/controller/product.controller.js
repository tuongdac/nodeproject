const { getList, update: handleUpdateProduct, create,deleteOne,   } = require('../model/product.model');
const getListProduct = async (req, res) => {
    try {
        const products = await getList();
        res.json({
            data: products,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const getProduct = async (req,res)=>{
    try {
        const {id} = req.params;
        deleteProduct(id);
    } catch (error) {
                res.status(400).json({
            message: error.message,
        });
    }
}

const deleteProduct = async (req,res)=>{
    try {
        const {id} = req.params;
        console.log('Delete Product: ' + id);
        deleteOne(id);
        res.status(200).json({
            message: 'delete product success'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const createProduct = async (req,res) =>{
    try {
        const data = req.body;
        const product = await create(data);
        res.status(200).json({
            message: 'create product success'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}
const updateProduct = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        const body = req.body;
        await handleUpdateProduct(id, body);
        res.status(300).json({
            message: 'replace product success',
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}


module.exports = {
    getListProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
