const mongoose = require('mongoose');
function connect() {
    const dnd = `mongodb+srv://tatuongdactvf:Zxcvbnm123@clusterdac.sedddqc.mongodb.net/?retryWrites=true&w=majority`
    mongoose.connect(dnd)
    console.log("Connect mongodb database!")
    mongoose.connection.on('error', error => console.log('error connect db', error))
    mongoose.connection.once('open', () => console.log(`Connect to saving DB successfully!!!`))
}

module.exports = { connect }