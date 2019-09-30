const express = require('express');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const app = express();


//middlewares
app.use(express.json());
app.use('/api/v1', router);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false}));

//Db connection
mongoose.connect(process.env.LOCAL_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err) throw err;
    console.log('database connection made!!');
})


const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));