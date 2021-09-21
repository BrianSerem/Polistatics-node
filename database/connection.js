const mongoose = require('mongoose');

function connectToDb() {
    mongoose.connect(process.env.LOCAL_DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, (err) => {
        if (err) throw err;
        console.log('database connection made!!');
    })
};

const closeDbConnection = () => {
    console.log('connection closed')
    return mongoose.disconnect()
};

function connectToDbAgain() {
    mongoose.connect(process.env.LOCAL_DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, (err) => {
        if (err) throw err;
        console.log('database connection made!!');
    })
};

const closeDbConnection = () => {
    console.log('connection closed')
    return mongoose.disconnect()
};

module.exports = {connectToDb, closeDbConnection};