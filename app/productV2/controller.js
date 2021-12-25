const Product = require('./model');
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb');

const addProduct = (req, res) => {
    const { name, price, stock, status } = req.body;
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        Product.create({ name, price, stock, status, image_url: `https://mern-crud-basic.herokuapp.com/public/${image.originalname}` })
            .then(result => res.send({
                status: 'Ok',
                response: result
            }))
            .catch(err => res.send(err))
    }
};

const getAll = (req, res) => {
    const { search } = req.query;
    let result = {}
    if (search) {
        result = Product.findOne({ name: search })
            .then(result => res.send({
                status: 'Ok',
                response: result
            }))
            .catch(err => res.send(err))
    } else {
        result = Product.find()
            .then(result => res.send({
                status: 'Ok',
                response: result
            }))
            .catch(err => res.send(err))
    }
};

const getById = (req, res) => {
    const id = req.params;
    Product.findOne({ _id: ObjectId(id) })
        .then(result => res.send({
            status: 'Ok',
            response: result
        }))
        .catch(err => res.send(err))
};

const updateById = (req, res) => {
    const id = req.params;
    const { name, price, stock, status } = req.body;
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        Product.updateOne({ _id: ObjectId(id) }, { name, price, stock, status, image_url: `https://mern-crud-basic.herokuapp.com/public/${image.originalname}` })
            .then(result => res.send({
                status: 'Ok',
                response: result
            }))
            .catch(err => res.send(err))
    } else {
        Product.updateOne({ _id: ObjectId(id) }, { name, price, stock, status })
            .then(result => res.send({
                status: 'Ok',
                response: result
            }))
            .catch(err => res.send(err))
    }
};

const deleteById = (req, res) => {
    const id = req.params;
    Product.deleteOne({ _id: ObjectId(id) })
        .then(result => res.send({
            status: 'Ok',
            response: result
        }))
        .catch(err => res.send(err))
};

module.exports = {
    addProduct,
    getAll,
    getById,
    updateById,
    deleteById,
}