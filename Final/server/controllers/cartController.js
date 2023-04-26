const Cart = require('../models/cart');
const Product = require("../models/product");

let dbCarts = {};

exports.get = (request, response, next) => {
    let token = request.header('Authorization');
    console.log('Get Cart', token);

    // TODO: authentication

    // TODO: authorization

    // TODO: handle request
    let cart = dbCarts[token];
    if (!cart) {
        return response.status(404).json({message: 'No cart found!'});
    } else {
        return response.status(200).json(cart.items);
    }
}

exports.create = (request, response, next) => {
    let token = request.header('Authorization');
    let productId = request.body.product_id;
    console.log('Add item to Cart', token, productId);

    // TODO: authentication

    // TODO: authorization

    // TODO: handle request
    let cart = dbCarts[token];
    if (!cart) {
        dbCarts[token] = cart = Cart.create(token);
    }

    let product = Product.find(productId);
    if (product) {
        cart.addItem(product, 1);
        return response.status(200).json(cart.items);
    } else {
        return response.status(404).json({message: 'No product found!'});
    }
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
