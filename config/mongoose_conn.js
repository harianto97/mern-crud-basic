const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } 
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', ()=>console.log('Koneksi ke database berhasil'));