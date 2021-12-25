const { ObjectId } = require('mongodb');
const db = require('../../config/mongodb_conn');
const path = require('path');
const fs = require('fs');

const addProduct = (req, res) => {
    const { name, price, stock, status } = req.body;
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        db.collection('products').insertOne({ name, price, stock, status, image_url: `http://localhost:5000/public/${image.originalname}` })
            .then(result => res.send({
                status: 'Ok',
                response: result
            }))
            .catch(err => res.send(err))
    }
};

const getAll = (req, res) => {
    const { search } = req.query;
    let result = {};
    if (search) {
        result = db.collection('products').find({ name: search })
            .toArray()
            .then(result => res.send({
                status: 'Ok',
                response: result
            }))
            .catch(err => res.send(err))
    } else {
        result = db.collection('products').find()
            .toArray()
            .then(result => res.send({
                status: 'Ok',
                response: result
            }))
            .catch(err => res.send(err))
    }
};

const getById = (req, res) => {
    const { id } = req.params;
    db.collection('products').findOne({ _id: ObjectId(id) })
        .then(result => res.send({
            status: 'Ok',
            response: result
        }))
        .catch(err => res.send(err))
};

const updateById = (req, res) => {
    const { name, price, stock, status } = req.body;
    const image = req.file;
    const { id } = req.params;
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        db.collection('products').updateOne(
            { _id: ObjectId(id) },
            { $set: { name, price, stock, status, image_url: `http://localhost:5000/public/${image.originalname}` } })
            .then(result => res.send({
                status: 'Ok',
                response: result
            }))
            .catch(err => res.send(err))
    } else {
        db.collection('products').updateOne(
            { _id: ObjectId(id) },
            { $set: { name, price, stock, status } })
            .then(result => res.send({
                status: 'Ok',
                response: result
            }))
            .catch(err => res.send(err))
    }
};

const deleteById = (req, res) => {
    const { id } = req.params;
    db.collection('products').deleteOne({ _id: ObjectId(id) })
        .then(result => res.send({
            status: 'Ok',
            response: result
        }))
        .catch(err => res.send(err))
}

module.exports = {
    addProduct,
    getAll,
    getById,
    updateById,
    deleteById,
}