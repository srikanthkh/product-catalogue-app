const express = require('express');
const { connect } = require('./database');
const request = require('request');
const { CurrencyAPI } = require('./configuration');

const products = [{id: 1, name: "Banana", price: 42.01, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", count: 0},
{ id: 2, name: "Apple", price: 53.99, description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", count: 0 }];

module.exports.App = async () => {
  const db = await connect();
  await db.exec('CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL, count INTIGER)')
  products.forEach(async product =>   {
    await db.exec(`INSERT INTO products (id, name, price, count) VALUES (${product.id}, "${product.name}", ${product.price}, ${product.count})`)
  });
  const app = express();
  app.get('/products', async (req, res) => {  
    const products = await db.all('SELECT * FROM products')
    if (req.query.currency) {
      request(CurrencyAPI.url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const { quotes } = JSON.parse(response.body);
          console.log('yo', quotes[`USD${req.query.currency}`])
          for (const product of products){
            product.price =  product.price * 1/quotes[`USD${req.query.currency}`]
          }
          console.log('products', products)
          res.send(products);
        } else {
          res.status(response.statusCode).send(error)
        }
      })
    } else {
      res.send(result);
    }
  });

  return app;
};
