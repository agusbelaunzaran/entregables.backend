const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    addProduct(product) {
        let products = this.getProducts();
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            ...product
        };
        products.push(newProduct);
        this.saveToFile(products);
        return newProduct;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer el archivo de productos:", error);
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        let products = this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            this.saveToFile(products);
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        let products = this.getProducts();
        products = products.filter(product => product.id !== id);
        this.saveToFile(products);
    }

    saveToFile(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
}


const productManager = new ProductManager('productos.json');


productManager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 100,
    code: '123',
    stock: 10
});

console.log(productManager.getProducts());


console.log(productManager.getProductById(1));


productManager.updateProduct(1, { price: 120, stock: 15 });


productManager.deleteProduct(1);