const express = require('express');
const { connect } = require('./database');
const path = require('path')
const request = require('request');
const { CurrencyAPI } = require('./configuration');
const bodyParser = require('body-parser');

const products = [{id: 1, name: "Banana", price: 42.01, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", count: 0},
{ id: 2, name: "Apple", price: 53.99, description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", count: 0 }];
const currencies = ['CAD', 'GBP', 'EUR'];

module.exports.App = async () => {
  const db = await connect();
  await db.exec('CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER NOT NULL, count INTIGER)')
  products.forEach(async product =>   {
    await db.exec(`INSERT INTO products (id, name, price, count) VALUES (${product.id}, "${product.name}", ${product.price}, ${product.count})`)
  });
  const app = express();
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.setHeader('Access-Control-Expose-Headers', ' *')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    )
    next()
  })
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('/products', async (req, res) => {
    const products = await db.all('SELECT * FROM products')
    if (req.query.currency && currencies.find(currency => (req.query.currency === currency))) {
      request(CurrencyAPI.url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const { quotes } = JSON.parse(response.body);
          for (const product of products){
            product.price =  (product.price * 1/quotes[`USD${req.query.currency}`]).toFixed(2);
          }
          res.send(products);
        } else {
          res.status(response.statusCode).send(error)
        }
      })
    } else {
      res.send(products);
    }
  });
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  })
  app.put('/products/:id',  async (req, res) => {
    const { count } = await db.get(`SELECT count FROM products WHERE id = ${req.params.id}`)
    await db.exec(`UPDATE products SET name = "${req.body.name}", price = ${req.body.price}, count = ${count + 1 } WHERE id = ${req.params.id}`)
    const products = await db.all('SELECT * FROM products')
    res.send(products);
  });
  return app;
};
