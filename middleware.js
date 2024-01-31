const jwt = require('jsonwebtoken')
const PRIVATE_KEY = 'adskjfabsfjkkw4u9283fbwecbshcbf94y34r3efb';

const generateToken = (data) => {
    return jwt.sign(
        data, // body 
        PRIVATE_KEY, // footer chứa chữ ký
        // { algorithm: 'RS256', expiresIn: '1h' } // header chứa thuật toán mã hóa
    );
}

const verifyUser = (req,res,next)=>{
    try{
        if(!req?.headers?.authorization){
            res.status(401).json({
                message:'unauthorization'
            });
            return;
        }
        console.log('req.headers.authorization',req.header.authorization)
        const token = req.headers.authorization.split(' ')[1];
        console.log('token: ', token);
        const decoded = jwt.verify(token, PRIVATE_KEY);
        console.log('decoded: ', decoded);
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({
            message:error.message
        })
    }
}

module.exports = {
    generateToken,
    verifyUser
}