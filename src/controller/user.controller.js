const { readAll, updateUser: handleUpdateUser, createUser, login } = require('../model/user.model');
const {comparePassword, cryptPassword } = require('../helper/bcrypt')
const {generateToken, verifyUser} = require('../middleware/auth.middleware');
const getListUser = async (req, res) => {
    try {
        const users = await readAll();
        res.json({
            data: users,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const body = req.body;
        await handleUpdateUser(userId, body);
        res.status(300).json({
            message: 'replace user success',
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const register = async (req,res)=>{
    try{
        const {password,...body} = req.body;
        console.log(password)
        const cryptPass = await cryptPassword(password)
        console.log(cryptPass)
        const user = await createUser({...body,password : cryptPass});
        res.json({
            message : 'register successfully',
            data: user
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }

}

const loginUser = async(req,res)=>{
    try {
        const { name, password } = req.body;
        const user = await login(name);
        if (user) {
            const isCorrectPassword = await comparePassword(password, user.password);
            if (!isCorrectPassword) {
                return res.status(400).json({
                    message: 'wrong password',
                });
            }
            console.log('isCorrectPassword', isCorrectPassword);
            // tạo token
            const token = generateToken(user);
            const { password: dndFake, __v, ...rest } = user;
            return res.json({
                data: rest,
                token: token,
            });
        } else {
            return res.status(400).json({
                message: 'user name not found',
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}


module.exports = {
    getListUser,
    updateUser,
    loginUser,
    register
}
