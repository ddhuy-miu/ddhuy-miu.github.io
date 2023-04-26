const Cart = require('../models/cart');
const Product = require("../models/product");

exports.checkout = (request, response, next) => {
    let token = request.header('Authorization');
    let username = token.split('-')[0];
    console.log('Checkout Cart', token);

    // TODO: authentication

    // TODO: authorization

    // TODO: handle request
    let items = request.body.items;
    for (let item of items) {
        let product = Product.find(item.id);
        if (!product)
            return response.status(404).json({message: `Product not found: ${item.name}`});
        if (item.count > product.stock)
            return response.status(409).json({message: `Out of stock: ${product.name}`});
    }
    for (let item of items) {
        let product = Product.find(item.id);
        product.stock = product.stock - item.count;
    }
    Cart.removeCart(username);
    return response.status(200).json({});
}

exports.get = (request, response, next) => {
    let token = request.header('Authorization');
    let username = token.split('-')[0];
    console.log('Get Cart', token);

    // TODO: authentication

    // TODO: authorization

    // TODO: handle request
    let cart = Cart.find(username);
    if (cart) {
        return response.status(200).json(cart.items);
    }
}

exports.create = (request, response, next) => {
    let token = request.header('Authorization');
    let username = token.split('-')[0];
    let productId = request.body.product_id;
    console.log('Add item to Cart', token, productId);

    // TODO: authentication

    // TODO: authorization

    // TODO: handle request
    let cart =  Cart.create(username);
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
