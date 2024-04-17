class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    addProduct(title,description, price, code, stock) {
        if (!title || !description||!price || !code ||!stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.error("El código del producto ya existe.");
            return;
        }

        const product = {
            id: this.productIdCounter++,
            title: title,
            description: description,
            price: price,
            code: code,
            stock: stock
        };

        this.products.push(product);
        console.log("Producto agregado correctamente:", product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado.");
        }
    }
}

const manager = new ProductManager();
manager.addProduct("teléfono", 100, 153, 12);
manager.addProduct("tablet", 200, 456, 8);
manager.addProduct("computadora", 500, 789, 5);

console.log(manager.getProducts());
console.log(manager.getProductById(2)); 
console.log(manager.getProductById(4)); 