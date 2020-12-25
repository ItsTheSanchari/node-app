const products = [];

module.exports = class Product {
    constructor(details) {
        this.title = details.title;
        this.path = details.path
    }

    saveProduct() {
        products.push(this);
    }

    static fetchAllProducts() {
        return products;
    }
}