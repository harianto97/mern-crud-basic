const mongoose = require('mongoose');

const url = 'mongodb+srv://user1:pwduser1@cluster0.8zl2y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', ()=>console.log('Koneksi ke database berhasil'));