const express = require('express');
require('dotenv').config({path: '../.env'});
// dotenv.config();
const cors = require('cors');
const products = require('./data/products');
const port = process.env.PORT || 8000;

const app = express();
app.use(cors());

app.get('/', (req, res)=>{
    res.send('API is running');
});

app.get('/api/products', (req, res)=>{
    res.json(products);
});

app.get('/api/products/:id', (req, res)=>{
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
})

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});