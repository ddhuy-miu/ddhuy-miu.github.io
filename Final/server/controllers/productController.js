const Product = require('../models/product');

exports.list = (request, response, next) => {
    console.log('Get All Products');
    // TODO: authentication
    // TODO: authorization
    // TODO: handle request
    response.status(200).json(Product.findAll());
}

exports.get = (request, response, next) => {
    console.log(`Get Product ${request.params.id}`);
    // TODO: authentication
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
