const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 4,
        maxlength : 50,
    },
    price : {
        type : Number,
        required : true,
        min : 500000,
        max : 50000000,
    },
    stock : Number,
    status : {
        type : Boolean,
        default : true,
    },
    image_url : {
        type : String,
    }
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;