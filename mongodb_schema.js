const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // bat buoc
        unique: true // Khong trung
    },
    age: Number,
    email: String,
    password: String,
    role: {
        type: String,
        defalt: 'user'
    },
    avatar: String
},{
    timestamps: true
    //collection : 'users'
})

const User = mongoose.model('User',userSchema);

const readAll = async (filter)=>{
    const user = await User.find({});
    return user;
}

const userLogin = async (username)=>{
    console.log(username);
    return await User.findOne({name:username}).exec(); 
}

const createUser = async (data) => {
    const user = await User.create(data);
    return user;
}

const comparePassword = function (plainPass, hashword){
    return bcryp
}

module.exports = {
    readAll,
    createUser,
    userLogin
}