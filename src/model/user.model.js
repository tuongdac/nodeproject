
const mongoose = require('mongoose');

// user model
// schema 
const userSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true, // bắt buộc phải có
        unique: true, // không được trùng
    },
    name: {
        type: String,
        required: true, // bắt buộc phải có
        unique: true, // không được trùng
    }, // key: type value 
    age: Number,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user',
    },
    avatar: String,
    tags: {
        type: [String],
        default: ['student', 'good'],
    }
}, {
    timestamps: true,
    // collection: 'users',
});

const User = mongoose.model('User', userSchema);
// createUser

const readAll = async (filter = {}) => {
    const users = await User.find(filter);
    return users;
};

const getUserById = (id) => {
    return User.findById(id);
}

const createUser = async (data) => {
    console.log('123')
    const newid = await getBiggestNumber();
    data.id = newid;
    console.log(newid);
    const user = await User.create(data);
    return user;
}

const updateUser = async (id, data) => {
    const user = await User.updateOne({
        _id: id,
    }, data);

    return user;
}
const deleteUser = async (id) => {
    const user = await User.deleteOne({ _id: id });
    return user;
}

const login = async (name) => {
    return await User.findOne({
        name
    }).lean();
}

const getBiggestNumber = async ()=>{
    const theBiggest = await User.findOne().sort({id:-1});
    if(theBiggest== null){
        return 'US000001';
    }
    const newnum =  parseInt(theBiggest.id.slice(2))+1;
    return 'US' + newnum.toString().padStart(6,'0');
}

module.exports = {
    readAll,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    login,
};