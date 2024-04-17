const express = require('express');
const ProductManager = require('./ProductManager')

const app = express();
const port = 5000;

const productManager = new ProductManager(); 


app.get('/products', (req, res) => {
  const limit = req.query.limit; 

  let products = productManager.getAllProducts(); 

  if (limit) {
    products = products.slice(0, parseInt(limit));
  }

  res.json(products); 
});


app.get('/products/:pid', (req, res) => {
  const productId = req.params.pid; 

  const product = productManager.getProductById(productId); 

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' }); 
  }

  res.json(product);
});


app.listen(port, () => {
  console.log( "Servidor escuchando en el puerto ${PORT}" );
});