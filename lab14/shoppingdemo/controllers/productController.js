const Product = require('../models/product');

exports.save = (req, res, next) => {
    const addedProd = new Product(null, req.body.title, req.body.description, req.body.price).save();
    res.status(201).json(addedProd);
}

exports.getAll = (req, res, next) => {
    res.status(200).json(Product.getAll());
}

exports.deleteById = (req, res, next) => {
    res.json(Product.deleteById(req.params.productId));
}

exports.edit = (req, res) => {
    console.log(`Edit Product ${req.params.productId}, ${req.body.title}, ${req.body.description}, ${req.body.price}`);
    const editedProd = new Product(req.params.productId, req.body.title, req.body.description, req.body.price).edit();
    res.json(editedProd);
}