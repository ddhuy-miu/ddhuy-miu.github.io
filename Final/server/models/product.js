const crypto = require('crypto');

class Product {
    constructor(name, price, image, stock) {
        this._id = crypto.randomUUID().toString().replaceAll("-", "");
        this._name = name;
        this._price = parseFloat(price);
        this._image = image;
        this._stock = parseInt(stock);
    }

    get id() {
        return this._id;
    }

    get stock() {
        return this._stock;
    }

    set stock(value) {
        this._stock = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    save() {
        let index = dbProducts.findIndex(p => p.id === this.id);
        if (index < 0) {
            dbProducts.push(this);
        } else {
            dbProducts.splice(index, 1, this);
        }
    }

    static find(id) {
        return dbProducts.find(p => p.id === id);
    }

    static findAll() {
        return dbProducts;
    }

    static delete(id) {
        let p = null;
        let index = dbProducts.findIndex(p => p.id === id);
        if (index >= 0) {
            p = dbProducts[index];
            dbProducts.splice(index, 1);
        }
        return p;
    }
}

let dbProducts = [
    new Product('Jetson AGX Orin Developer Kit', 1999, 'jetson-agx-orin-dev-kit.png', 13),
    new Product('NVIDIA Jetson AGX Xavier 64GB Module', 1399, 'jetson-agx-xavier-module.png', 7),
    new Product('Jetson Xavier NX 16GB Module', 579, 'jetson-xavier-nx-module.png', 21),
    new Product('NVIDIA Jetson TX2i Module', 849, 'jetson-tx2i-module.png', 8),
    new Product('NVIDIA Jetson Nano Developer Kit', 149, 'jetson-nano-commercial-developer-kit.png', 9),
];

module.exports = Product;