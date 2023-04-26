class Cart {
    constructor(username) {
        this._username = username;
        this._cartItems = [];
    }

    get username() {
        return this._username;
    }

    get items() {
        return this._cartItems;
    }

    addItem(product, count) {
        let item = this.items.find(c => c.product.id === product.id);
        if (item) {
            item.count += count;
        } else {
            this.items.push({product: product, count: count});
        }
    }

    removeItem(product, count) {
        let index = this.items.findIndex(c => c.product.id === product.id);
        if (index >= 0) {
            let item = this.items[index];

            if (count)
                item.count -= count;
            else
                item.count = 0;

            if (item.count <= 0)
                this.items.splice(index, 1);
        }
    }

    emptyCart() {
        this._cartItems = [];
    }

    static find(username) {
        return dbCarts.find(c => c.username === username);
    }

    static create(username) {
        let cart = dbCarts.find(c => c.username === username);
        if (!cart)
            cart = new Cart(username);
        return cart;
    }
}

let dbCarts = [
    new Cart('admin'),
    new Cart('user'),
];

module.exports = Cart;