let db = [];
let counter = 1;

class Product {
    constructor(id, title, description, price) {
        if (!id)
            this.id = counter++;
        else
            this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
    }

    save() {
        // this.id = ++counter; //start with 1;
        db.push(this);
        return this;
    }

    edit() {
        const index = db.findIndex(prod => parseInt(prod.id) === parseInt(this.id));
        console.log(index, this.id);
        db.splice(index, 1, this);
        return this;
    }


    static getAll() {
        return db;
    }

    static deleteById(prodId) {
        const index = db.findIndex(prod => parseInt(prod.id) === parseInt(this.id));
        const deletedProd = db[index];
        db.splice(index, 1);
        return deletedProd;
    }
}

db.push(new Product(null, "MPP", "Modern Practice Programming", 199.99));
db.push(new Product(null, "WAP", "Web Application Programming", 199.99));
db.push(new Product(null, "ALG", "Algorithm", 199.99));

console.log(db);

module.exports = Product;