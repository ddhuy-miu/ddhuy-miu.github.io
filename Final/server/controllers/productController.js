const Product = require('../models/product');
const User = require("../models/user");

exports.list = (request, response, next) => {
    console.log('Get All Products');

    // TODO: authentication
    let token = request.header('Authorization');
    let user = User.verifyToken(token);
    if (!user)
        return response.status(403).json({message: 'Your need to login or the provided Token is invalid!'});

    // TODO: authorization
    // TODO: handle request
    response.status(200).json(Product.findAll());
}

exports.get = (request, response, next) => {
    console.log(`Get Product ${request.params.id}`);

    // TODO: authentication
    let token = request.header('Authorization');
    let user = User.verifyToken(token);
    if (!user)
        return response.status(403).json({message: 'Your need to login or the provided Token is invalid!'});

    // TODO: authorization

    // TODO: handle request
    let product = Product.find(request.params.id);
    if (product)
        return response.status(200).json(product);
    return response.status(404).json({message: 'No item found'});
}

exports.create = (request, response, next) => {
    // TODO: authentication
    // TODO: authorization
    // TODO: handle request
}

exports.update = (request, response, next) => {
    // TODO: authentication
    // TODO: authorization
    // TODO: handle request
}

exports.delete = (request, response, next) => {
    // TODO: authentication
    // TODO: authorization
    // TODO: handle request
}
