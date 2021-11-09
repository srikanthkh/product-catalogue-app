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
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.use((req, res, next) => {
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

  const fetchExchangeRates = async () => {
    return new Promise((resolve, reject) => {
      request(CurrencyAPI.url,(error, res) => {
        if (!error && res.statusCode == 200) {
          resolve(JSON.parse(res.body).quotes);
        } else {
          reject(error);
        }
      });
    });
  }

  const convertToCurrency = (products, currency, quotes) => {
    for (const product of products){
      product.price =  (product.price * quotes[`USD${currency}`]).toFixed(2);
    }
    return products;
  }

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  })

  app.get('/products', async (req, res) => {
    const { currency } = req.query;
    const products = await db.all('SELECT * FROM products')
    if (currency && currencies.includes(currency)) {
      const quotes = await fetchExchangeRates();
      res.send(convertToCurrency(products, currency, quotes));
    } else {
      res.send(products);
    }
  });

  app.put('/products/:id',  async (req, res) => {
    const { price, currency, name } = req.body;
    const { id } = req.params;
    const isNotUsd = currency && currencies.includes(currency)
    const { count } = await db.get(`SELECT count FROM products WHERE id = ${id}`)
    if (isNotUsd) {
      const quotes = await fetchExchangeRates();
      await db.exec(`UPDATE products SET name = "${name}", price = ${(price * (1/quotes[`USD${currency}`])).toFixed(2)}, count = ${count + 1} WHERE id = ${id}`)
      const products = await db.all('SELECT * FROM products')
      res.send(convertToCurrency(products, currency, quotes));
    }  else {
      await db.exec(`UPDATE products SET name = "${name}", price = ${price}, count = ${count + 1} WHERE id = ${id}`)
      res.send(await db.all('SELECT * FROM products'));
    }
  });
  return app;
};
